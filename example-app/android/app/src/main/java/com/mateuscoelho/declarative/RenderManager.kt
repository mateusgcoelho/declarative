package com.mateuscoelho.declarative

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.text.Layout
import android.text.TextUtils
import android.util.Log
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import com.shiqi.quickjs.JSString
import com.shiqi.quickjs.JSValue
import org.json.JSONObject
import java.lang.ref.WeakReference

class RenderManager(
    private val bridge: Bridge,
    private val rootContainer: View,
    private val contextRef: WeakReference<Context>,
) {
    private var actualBlock: String = "{}"

    fun getContext(): Context {
        return contextRef.get() ?: throw IllegalStateException("Context reference is null")
    }

    init {
        bridge.initListenForUIUpdates { jsCtx, args ->
            Log.i("DeclarativeUI", "Received UI update notification")

            if (args.isNotEmpty()) {
                val firstArg = args.get(0)
                when (firstArg) {
                    is JSString -> {
                        val newBlock = (firstArg as JSString).string
                        Log.i("DeclarativeUI", "New block received as JSString: $newBlock")
                        updateUI(newBlock)
                    }
                }
            }


            jsCtx.createJSUndefined()
        }
    }

    fun renderUI(): View {
        actualBlock = bridge.executeJS<String>("actualBlock") ?: "{}"
        val jsonObject = JSONObject(actualBlock)
        val node = parseNode(jsonObject)
        return renderNode(node)
    }

    fun updateUI(newBlock: String) {
        val context = getContext()
        Log.i("DeclarativeUI", "Updating UI with new block: $newBlock")
        Log.i("DeclarativeUI", "Current block: $actualBlock")
        Log.i("DeclarativeUI", newBlock)

        val jsonObject = JSONObject(newBlock)
        val node = parseNode(jsonObject)

        val view = renderNode(node)

        rootContainer.let { container ->
            container.invalidate()
            container.requestLayout()

            // Se ainda não funcionar, tente também:
            // container.post {
            //     container.invalidate()
            //     container.requestLayout()
            // }
            if (container is ViewGroup) {
                container.removeAllViews()
                container.addView(view)
            } else {
                Log.e("DeclarativeUI", "Root container is not a ViewGroup")
                Toast.makeText(context, "Erro ao atualizar UI: Container inválido", Toast.LENGTH_SHORT).show()
            }
        }
        actualBlock = newBlock
        Log.i("DeclarativeUI", "UI updated successfully")
    }

    fun parseNode(json: JSONObject): DeclarativeNode {
        return when (val type = json.getString("type")) {
            "text" -> DeclarativeNode.SimpleText(
                text = json.getString("text"),
                textColor = json.optStringOrNull("textColor"),
                textSize = json.optFloatOrNull("textSize"),
                fontWeight = json.optStringOrNull("fontWeight"),
                fontStyle = json.optStringOrNull("fontStyle"),
                textAlign = json.optStringOrNull("textAlign"),
                maxLines = json.optIntOrNull("maxLines"),
                ellipsize = json.optStringOrNull("ellipsize"),
                lineHeight = json.optFloatOrNull("lineHeight")
            )
            "container" -> {
                DeclarativeNode.Container(
                    child = json.optJSONObject("child")?.let { parseNode(it) },

                    padding = json.optIntOrNull("padding"),
                    paddingLeft = json.optIntOrNull("paddingLeft"),
                    paddingRight = json.optIntOrNull("paddingRight"),
                    paddingTop = json.optIntOrNull("paddingTop"),
                    paddingBottom = json.optIntOrNull("paddingBottom"),

                    margin = json.optIntOrNull("margin"),
                    marginLeft = json.optIntOrNull("marginLeft"),
                    marginRight = json.optIntOrNull("marginRight"),
                    marginTop = json.optIntOrNull("marginTop"),
                    marginBottom = json.optIntOrNull("marginBottom"),

                    backgroundColor = json.optStringOrNull("backgroundColor"),
                    width = json.optStringOrNull("width"),
                    height = json.optStringOrNull("height"),
                    gravity = json.optStringOrNull("gravity"),
                )
            }

            "row" -> {
                val childrenJson = json.optJSONArray("children")
                val children = mutableListOf<DeclarativeNode>()
                if (childrenJson != null) {
                    for (i in 0 until childrenJson.length()) {
                        val childJson = childrenJson.getJSONObject(i)
                        children.add(parseNode(childJson))
                    }
                }
                DeclarativeNode.Row(children)
            }
            "column" -> {
                val childrenJson = json.optJSONArray("children")
                val children = mutableListOf<DeclarativeNode>()
                if (childrenJson != null) {
                    for (i in 0 until childrenJson.length()) {
                        val childJson = childrenJson.getJSONObject(i)
                        children.add(parseNode(childJson))
                    }
                }
                DeclarativeNode.Column(children)
            }
            "button" -> {
                DeclarativeNode.Button(
                    text = json.optString("text", ""),
                    textColor = json.optString("textColor", null),
                    backgroundColor = json.optString("backgroundColor", null),
                    textSize = json.optDouble("textSize", Double.NaN).let { if (it.isNaN()) null else it.toFloat() },
                    padding = json.optInt("padding", -1).let { if (it == -1) null else it },
                    paddingLeft = json.optInt("paddingLeft", -1).let { if (it == -1) null else it },
                    paddingRight = json.optInt("paddingRight", -1).let { if (it == -1) null else it },
                    paddingTop = json.optInt("paddingTop", -1).let { if (it == -1) null else it },
                    paddingBottom = json.optInt("paddingBottom", -1).let { if (it == -1) null else it },
                    enabled = json.optBoolean("enabled", true),
                    functionId = json.optString("functionId", null)
                )
            }
            "expanded" -> {
                val childJson = json.getJSONObject("child")
                DeclarativeNode.Expanded(parseNode(childJson))
            }
            else -> throw IllegalArgumentException("Unknown node type: $type")
        }
    }

    fun renderNode(node: DeclarativeNode, parentIsRowOrColumn: Boolean = false): View {
        val context = getContext()
       
        return when (node) {
            is DeclarativeNode.SimpleText -> {
                val tv = TextView(context)
                tv.text = node.text

                node.textColor?.let {
                    try {
                        tv.setTextColor(Color.parseColor(it))
                    } catch (_: IllegalArgumentException) {}
                }

                node.textSize?.let { tv.setTextSize(TypedValue.COMPLEX_UNIT_SP, it) }

                node.fontWeight?.let {
                    val style = when (it.lowercase()) {
                        "bold" -> Typeface.BOLD
                        else -> Typeface.NORMAL
                    }
                    tv.setTypeface(tv.typeface, style)
                }

                node.fontStyle?.let {
                    val style = when (it.lowercase()) {
                        "italic" -> Typeface.ITALIC
                        else -> Typeface.NORMAL
                    }
                    tv.setTypeface(tv.typeface, style)
                }

                node.textAlign?.let {
                    val gravity = when (it.lowercase()) {
                        "center" -> Gravity.CENTER_HORIZONTAL
                        "right" -> Gravity.END
                        "left" -> Gravity.START
                        "justify" -> Gravity.FILL_HORIZONTAL
                        else -> Gravity.START
                    }
                    tv.gravity = gravity
                }

                node.maxLines?.let { tv.maxLines = it }

                node.ellipsize?.let {
                    tv.ellipsize = when (it.lowercase()) {
                        "start" -> TextUtils.TruncateAt.START
                        "middle" -> TextUtils.TruncateAt.MIDDLE
                        "end" -> TextUtils.TruncateAt.END
                        "none" -> null
                        else -> null
                    }
                }

                tv
            }
            is DeclarativeNode.Container -> {
                val layout = FrameLayout(context)

                val paddingLeft = node.paddingLeft ?: node.padding ?: 0
                val paddingTop = node.paddingTop ?: node.padding ?: 0
                val paddingRight = node.paddingRight ?: node.padding ?: 0
                val paddingBottom = node.paddingBottom ?: node.padding ?: 0

                layout.setPadding(
                    context.dpToPx(paddingLeft),
                    context.dpToPx(paddingTop),
                    context.dpToPx(paddingRight),
                    context.dpToPx(paddingBottom)
                )

                node.backgroundColor?.let {
                    layout.setBackgroundColor(Color.parseColor(it))
                }

                val widthPx = when (node.width) {
                    "match_parent" -> ViewGroup.LayoutParams.MATCH_PARENT
                    "wrap_content" -> ViewGroup.LayoutParams.WRAP_CONTENT
                    else -> node.width?.toIntOrNull()?.let { context.dpToPx(it) }
                        ?: ViewGroup.LayoutParams.WRAP_CONTENT
                }

                val heightPx = when (node.height) {
                    "match_parent" -> ViewGroup.LayoutParams.MATCH_PARENT
                    "wrap_content" -> ViewGroup.LayoutParams.WRAP_CONTENT
                    else -> node.height?.toIntOrNull()?.let { context.dpToPx(it) }
                        ?: ViewGroup.LayoutParams.WRAP_CONTENT
                }

                val params = ViewGroup.MarginLayoutParams(widthPx, heightPx)

                val marginLeft = node.marginLeft ?: node.margin ?: 0
                val marginTop = node.marginTop ?: node.margin ?: 0
                val marginRight = node.marginRight ?: node.margin ?: 0
                val marginBottom = node.marginBottom ?: node.margin ?: 0

                params.setMargins(
                    context.dpToPx(marginLeft),
                    context.dpToPx(marginTop),
                    context.dpToPx(marginRight),
                    context.dpToPx(marginBottom)
                )

                layout.layoutParams = params

                node.child?.let { layout.addView(renderNode(it)) }

                node.gravity?.let { gravityStr ->
                    val gravityInt = when (gravityStr.lowercase()) {
                        "center" -> Gravity.CENTER
                        "start" -> Gravity.START
                        "end" -> Gravity.END
                        "top" -> Gravity.TOP
                        "bottom" -> Gravity.BOTTOM
                        else -> Gravity.NO_GRAVITY
                    }
                    (layout.layoutParams as? FrameLayout.LayoutParams)?.gravity = gravityInt
                }

                layout
            }
            is DeclarativeNode.Button -> {
                Button(context).apply {
                    text = node.text
                    isEnabled = node.enabled

                    node.textColor?.let {
                        setTextColor(Color.parseColor(it))
                    }

                    node.backgroundColor?.let {
                        setBackgroundColor(Color.parseColor(it))
                    }

                    node.textSize?.let {
                        setTextSize(TypedValue.COMPLEX_UNIT_SP, it)
                    }

                    // Padding: prioriza padding geral, senão usa os individuais
                    val paddingLeft = node.paddingLeft ?: node.padding ?: 0
                    val paddingRight = node.paddingRight ?: node.padding ?: 0
                    val paddingTop = node.paddingTop ?: node.padding ?: 0
                    val paddingBottom = node.paddingBottom ?: node.padding ?: 0

                    setPadding(
                        context.dpToPx(paddingLeft),
                        context.dpToPx(paddingTop),
                        context.dpToPx(paddingRight),
                        context.dpToPx(paddingBottom)
                    )

                    if (node.functionId != null) {
                        setOnClickListener {
                            bridge.executeJSFunctionByName(node.functionId)
                        }
                    }
                }
            }
            is DeclarativeNode.Expanded -> {
                val childView = renderNode(node.child, true)
                val layoutParams = LinearLayout.LayoutParams(
                    0, // width 0 to use weight
                    ViewGroup.LayoutParams.WRAP_CONTENT, // height wrap_content
                    1f // weight = 1 to expand
                )

                childView.layoutParams = layoutParams
                childView
            }
            is DeclarativeNode.Row -> {
                val layout = LinearLayout(context).apply {
                    orientation = LinearLayout.HORIZONTAL
                }
                node.children.forEach { child ->
                    val view = renderNode(child, true)
                    layout.addView(view)
                }
                layout
            }
            is DeclarativeNode.Column -> {
                val layout = LinearLayout(context).apply {
                    orientation = LinearLayout.VERTICAL
                }
                node.children.forEach { child ->
                    val view = renderNode(child, true)
                    layout.addView(view)
                }
                layout
            }
            else -> {
                throw IllegalArgumentException("Unknown node type: $node")
            }
        }
    }


}

fun Context.dpToPx(dp: Int): Int =
    (dp * resources.displayMetrics.density).toInt()

fun JSONObject.optIntOrNull(name: String, fallback: Int = -1): Int? {
    val value = optInt(name, fallback)
    return if (value == fallback) null else value
}

fun JSONObject.optStringOrNull(name: String, fallback: String? = null): String? {
    val value = optString(name, fallback ?: "")
    return if (value.isEmpty() && fallback == null) null else value
}

fun JSONObject.optFloatOrNull(name: String, fallback: Float = Float.NaN): Float? {
    val value = optDouble(name, fallback.toDouble()).toFloat()
    return if (value.isNaN()) null else value
}