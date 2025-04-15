/**
 * Flutter project template
 * This is a dummy script that will be replaced with actual project generation logic
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

export function createFlutterProject(projectName) {
    console.log(chalk.magenta('🚀 Creating Flutter project...'));
    console.log(chalk.cyan(`Category: Mobile`));
    console.log(chalk.cyan(`Technology: Flutter`));

    // Check if Flutter is installed
    try {
        execSync('flutter --version', { stdio: 'ignore' });
        console.log(chalk.green('✅ Flutter is installed'));
    } catch (error) {
        console.error(chalk.red('❌ Flutter is not installed. Please install Flutter first:'));
        console.error(chalk.red('   Visit https://docs.flutter.dev/get-started/install'));
        process.exit(1);
    }

    // Validate project name
    const projectNameRegex = /^[a-z][a-z0-9_]*[a-z0-9]$/;
    const reservedWords = ['flutter', 'dart', 'test', 'build', 'dev', 'prod'];

    if (!projectNameRegex.test(projectName)) {
        console.error(chalk.red('❌ Invalid project name. Project name must:'));
        console.error(chalk.red('   - Start with a lowercase letter'));
        console.error(chalk.red('   - Contain only lowercase letters, numbers, and underscores'));
        console.error(chalk.red('   - Not end with an underscore'));
        console.error(chalk.red('   - Not contain spaces or special characters'));
        process.exit(1);
    }

    if (reservedWords.includes(projectName.toLowerCase())) {
        console.error(chalk.red(`❌ Project name cannot be a reserved word: ${projectName}`));
        process.exit(1);
    }

    // Create Flutter project
    try {
        console.log(chalk.yellow('📦 Creating new Flutter project...'));
        execSync(`flutter create --org com.example --platforms=android,ios,web ${projectName}`, { stdio: 'inherit' });

        // Navigate to project directory
        process.chdir(projectName);

        console.log(chalk.green(`✅ Flutter project "${projectName}" created successfully!`));
        console.log(chalk.green(`📂 Project location: ${process.cwd()}`));
        console.log(chalk.green(`🚀 To start the development server:`));
        console.log(chalk.green(`   flutter run`));
        console.log(chalk.green(`\n📱 To run on specific platforms:`));
        console.log(chalk.green(`   iOS: flutter run -d ios`));
        console.log(chalk.green(`   Android: flutter run -d android`));
        console.log(chalk.green(`   Web: flutter run -d chrome`));
        console.log(chalk.green(`\n🎮 Emulator setup:`));
        console.log(chalk.green(`   List available devices: flutter devices`));
        console.log(chalk.green(`   iOS Simulator:`));
        console.log(chalk.green(`     - Install Xcode from the Mac App Store`));
        console.log(chalk.green(`     - Open Xcode > Preferences > Components > Install iOS Simulator`));
        console.log(chalk.green(`     - Start simulator: open -a Simulator`));
        console.log(chalk.green(`   Android Emulator:`));
        console.log(chalk.green(`     - Install Android Studio`));
        console.log(chalk.green(`     - Open Android Studio > Tools > Device Manager`));
        console.log(chalk.green(`     - Create a new virtual device or use an existing one`));
        console.log(chalk.green(`     - Start emulator from Android Studio or command line`));
        console.log(chalk.green(`\n🔧 Additional commands:`));
        console.log(chalk.green(`   Build: flutter build`));
        console.log(chalk.green(`   Test: flutter test`));
        console.log(chalk.green(`   Clean: flutter clean`));
        console.log(chalk.green(`   Get dependencies: flutter pub get`));
        console.log(chalk.green(`\n📚 Project structure:`));
        console.log(chalk.green(`   lib/ - Main application code`));
        console.log(chalk.green(`   test/ - Test files`));
        console.log(chalk.green(`   android/ - Android specific code`));
        console.log(chalk.green(`   ios/ - iOS specific code`));
        console.log(chalk.green(`   web/ - Web specific code`));

        process.exit(0);
    } catch (error) {
        console.error(chalk.red('❌ Error creating Flutter project:'), error.message);
        process.exit(1);
    }
} 