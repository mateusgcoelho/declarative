package com.mateuscoelho.declarative

import android.content.Context
import android.util.Log
import com.shiqi.quickjs.JSContext
import com.shiqi.quickjs.JSRuntime
import com.shiqi.quickjs.JSValue
import com.shiqi.quickjs.QuickJS
import java.io.BufferedReader
import java.io.InputStreamReader
import java.util.Optional

class Bridge(context: Context) {
    private val quickJS: QuickJS = QuickJS.Builder().build()
    private val jsRuntime: JSRuntime = quickJS.createJSRuntime()
    private val jsContext: JSContext = jsRuntime.createJSContext()

    init {
        initDeclarativeUIBridge(context)
    }

    private fun initDeclarativeUIBridge(context: Context) {
        try {
            Log.i("DeclarativeUI", "Initializing Declarative UI Bridge...")

            val jsCode = readJsFromAssets(context, "app/index.js")
            jsContext.evaluate(jsCode, "app/index.js")

            Log.i("DeclarativeUI", "Declarative UI Bridge initialized successfully.")
        } catch (e: Exception) {
            Log.e("DeclarativeUI", "Error initializing Declarative UI Bridge: ${e.message}")
            e.printStackTrace()
        }
    }

    fun initListenForUIUpdates(callback: (JSContext, Array<JSValue>) -> JSValue) {
        try {
            Log.i("DeclarativeUI", "Listening for UI updates...")

            val notifyNative = jsContext.createJSFunction(callback)

            val globalObj = jsContext.globalObject
            globalObj.setProperty("notifyNative", notifyNative)

            Log.i("DeclarativeUI", "Listening for UI updates initialized successfully.")
        } catch (e: Exception) {
            Log.e("DeclarativeUI", "Error initializing UI updates listener: ${e.message}")
            e.printStackTrace()
        }
    }


    private fun readJsFromAssets(context: Context, fileName: String): String {
        val inputStream = context.assets.open(fileName)
        return BufferedReader(InputStreamReader(inputStream)).use { it.readText() }
    }

    fun destroy() {
        jsContext.close()
        jsRuntime.close()
    }

    fun getJSContext(): JSContext {
        return jsContext
    }

    inline fun <reified T> executeJS(code: String): T? {
        return try {
            this.getJSContext().evaluate<T>(code, "inline.js", T::class.java)
        } catch (e: Exception) {
            Log.e("DeclarativeUI", "Error executing JS code: ${e.message}")
            e.printStackTrace()
            null
        }
    }

    fun executeJSFunctionByName(functionId: String) {
        jsContext.evaluate("""
            if (globalThis.__functionRegistry && typeof globalThis.__functionRegistry['$functionId'] === 'function') {
                globalThis.__functionRegistry['$functionId']();
            }
        """.trimIndent(), "click.js")
    }
}
