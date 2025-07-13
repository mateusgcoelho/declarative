import java.io.File

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.mateuscoelho.declarative"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.mateuscoelho.declarative"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)
    implementation(files("./libs/quickjs-android-0.2.1.aar"))
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
}

tasks.named("preBuild") {
    dependsOn(copyDistToAssets)
}

val copyDistToAssets by tasks.registering(Copy::class) {
    val distDir = rootProject.file("../dist")
    val assetsDir = File(projectDir, "src/main/assets")

    doFirst {
        println("Limpando a pasta assets: ${assetsDir.absolutePath}")
        delete(assetsDir)            // apaga a pasta assets inteira
        assetsDir.mkdirs()           // recria a pasta assets vazia
    }

    from(distDir)
    into(assetsDir)

    doFirst {
        println("Copiando todos arquivos de ${distDir.absolutePath} para ${assetsDir.absolutePath}")
    }
}
