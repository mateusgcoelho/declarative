package com.mateuscoelho.declarative

import android.content.Context
import android.os.Bundle
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.shiqi.quickjs.QuickJS
import java.lang.ref.WeakReference

class MainActivity : AppCompatActivity() {
    private lateinit var rootLayout: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val bridge = Bridge(this)

        rootLayout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
        }

        val contextRef = WeakReference<Context>(this)
        val renderManager = RenderManager(
            bridge,
            rootLayout,
            contextRef,
        )

        setContentView(rootLayout)

        val view = renderManager.renderUI()
        rootLayout.addView(view)
    }
}
