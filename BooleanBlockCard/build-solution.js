const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const archiver = require('archiver');

// First, ensure the PCF is built
console.log('Building PCF control...');
try {
    execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
    console.error('Failed to build PCF control:', error);
    process.exit(1);
}

// Create output directory
const outputDir = path.join(__dirname, 'Solutions', 'BooleanBlockCardSolution', 'bin', 'Debug');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Create solution zip
const output = fs.createWriteStream(path.join(outputDir, 'BooleanBlockCardSolution.zip'));
const archive = archiver('zip', {
    zlib: { level: 9 }
});

output.on('close', function() {
    console.log(`Solution created: ${archive.pointer()} total bytes`);
    console.log('Solution package created at: Solutions/BooleanBlockCardSolution/bin/Debug/BooleanBlockCardSolution.zip');
});

archive.on('error', function(err) {
    throw err;
});

archive.pipe(output);

// Add solution files
const solutionSrcPath = path.join(__dirname, 'Solutions', 'BooleanBlockCardSolution', 'src');
archive.directory(solutionSrcPath, false);

// Add control output
const controlOutputPath = path.join(__dirname, 'out', 'controls', 'BooleanBlock.BooleanBlockCard');
if (fs.existsSync(controlOutputPath)) {
    archive.directory(controlOutputPath, 'Controls/new_booleanblockcardcontrol');
}

archive.finalize();