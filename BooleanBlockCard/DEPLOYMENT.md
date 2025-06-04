# Deployment Instructions for Boolean Block Card PCF

## Prerequisites
- Node.js and npm installed
- Power Platform CLI or Visual Studio with Power Platform tools
- Access to a Power Platform environment

## Build and Package Steps

### 1. Build the PCF Control
```bash
cd BooleanBlockCard
npm install
npm run build
```

### 2. Build the Solution

#### For Linux/Mac users:
```bash
npm run build-solution
```

#### For Windows users with msbuild:
```bash
cd Solutions/BooleanBlockCardSolution
msbuild /t:build /restore
```

This will generate a managed solution file at:
`Solutions/BooleanBlockCardSolution/bin/Debug/BooleanBlockCardSolution.zip`

## Deploy to Power Platform

### Option 1: Using Power Platform CLI
```bash
pac auth create --url https://yourorg.crm.dynamics.com
pac solution import --path Solutions/BooleanBlockCardSolution/bin/Debug/BooleanBlockCardSolution.zip
```

### Option 2: Manual Import
1. Go to https://make.powerapps.com
2. Select your environment
3. Navigate to Solutions
4. Click "Import solution"
5. Upload the `BooleanBlockCardSolution.zip` file
6. Follow the import wizard

## Use in Model-Driven App

1. Open your model-driven app in the app designer
2. Select the form where you want to add the control
3. Add a new field or select an existing Two Options (Yes/No) field
4. In the field properties:
   - Click on "Controls" tab
   - Click "Add Control"
   - Select "BooleanBlockCard"
   - Set it as default for Web, Phone, and Tablet
5. Configure the control properties:
   - `booleanValue`: Bind to your Yes/No field
   - `textValue`: Bind to a multiline text field
   - `defaultText`: Set the default text value
6. Save and publish the app

## Testing
After deployment, the control will show:
- A toggle switch that controls text field editability
- When OFF: Shows the default text (read-only)
- When ON: Allows custom text input

## Troubleshooting
- If the control doesn't appear, ensure it's published in the solution
- Check browser console for any errors
- Verify all required fields are properly bound in the control properties