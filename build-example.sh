#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

rm -rf build

# Step 1: Build the declarative library
echo "Building the declarative library..."
cd declarative
npm run compile
cd ..

# Step 2: Build the example app
echo "Building the example app..."
cd example-app
npm run compile

# Step 3: Build the Android application
echo "Building the Android application..."
cd android
./gradlew build

# Step 4: Copy the APK to the root build folder
echo "Copying APK to the root build folder..."
DESTINATION="../../build"
mkdir -p "$DESTINATION"
pwd
cp -R ./app/build/* "$DESTINATION"

echo "All builds completed successfully!"