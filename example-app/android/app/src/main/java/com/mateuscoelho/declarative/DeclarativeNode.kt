package com.mateuscoelho.declarative

sealed class DeclarativeNode {
    data class Container(
        val child: DeclarativeNode?,
        val padding: Int? = null,
        val paddingLeft: Int? = null,
        val paddingRight: Int? = null,
        val paddingTop: Int? = null,
        val paddingBottom: Int? = null,

        val margin: Int? = null,
        val marginLeft: Int? = null,
        val marginRight: Int? = null,
        val marginTop: Int? = null,
        val marginBottom: Int? = null,

        val backgroundColor: String? = null,
        val width: String? = null,   // "wrap_content", "match_parent" ou dp em string "100"
        val height: String? = null,
        val gravity: String? = null  // ex: "center", "start", "end", "top", "bottom"
    ) : DeclarativeNode()
    data class Column(val children: List<DeclarativeNode>) : DeclarativeNode()
    data class Row(val children: List<DeclarativeNode>) : DeclarativeNode()
    data class Button(
        val text: String = "",
        val textColor: String? = null,
        val backgroundColor: String? = null,
        val textSize: Float? = null,
        val padding: Int? = null,
        val paddingLeft: Int? = null,
        val paddingRight: Int? = null,
        val paddingTop: Int? = null,
        val paddingBottom: Int? = null,
        val enabled: Boolean = true,
        val functionId: String? = null,
    ) : DeclarativeNode()
    data class Expanded(val child: DeclarativeNode) : DeclarativeNode()
    data class SimpleText(
        val text: String,
        val textColor: String? = null,
        val textSize: Float? = null,       // em sp
        val fontWeight: String? = null,    // "normal", "bold"
        val fontStyle: String? = null,     // "normal", "italic"
        val textAlign: String? = null,     // "left", "center", "right", "justify"
        val maxLines: Int? = null,
        val ellipsize: String? = null,     // "end", "start", "middle", "none"
        val lineHeight: Float? = null      // em sp
    ) : DeclarativeNode()
}
