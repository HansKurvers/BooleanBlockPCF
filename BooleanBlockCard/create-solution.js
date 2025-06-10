const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create solution structure
const solutionName = 'BooleanBlockCardSolution';
const publisherName = 'BooleanBlock';
const publisherPrefix = 'bb';
const controlName = 'BooleanBlockCard';

// Create temp directory for solution
const tempDir = path.join(__dirname, 'temp-solution');
if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// Create [Content_Types].xml
const contentTypes = `<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="xml" ContentType="application/xml" />
</Types>`;
fs.writeFileSync(path.join(tempDir, '[Content_Types].xml'), contentTypes);

// Create solution.xml
const solutionXml = `<?xml version="1.0" encoding="utf-8"?>
<ImportExportXml version="9.1.0.643" SolutionPackageVersion="9.1" languagecode="1033" generatedBy="CrmLive" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <SolutionManifest>
    <UniqueName>${solutionName}</UniqueName>
    <LocalizedNames>
      <LocalizedName description="${solutionName}" languagecode="1033" />
    </LocalizedNames>
    <Descriptions>
      <Description description="Boolean Block Card PCF Control Solution" languagecode="1033" />
    </Descriptions>
    <Version>1.0.0.0</Version>
    <Managed>0</Managed>
    <Publisher>
      <UniqueName>${publisherName}</UniqueName>
      <LocalizedNames>
        <LocalizedName description="${publisherName}" languagecode="1033" />
      </LocalizedNames>
      <Descriptions>
        <Description description="${publisherName} Publisher" languagecode="1033" />
      </Descriptions>
      <EMailAddress />
      <SupportingWebsiteUrl />
      <CustomizationPrefix>${publisherPrefix}</CustomizationPrefix>
      <CustomizationOptionValuePrefix>10000</CustomizationOptionValuePrefix>
      <Addresses>
        <Address>
          <AddressNumber>1</AddressNumber>
          <AddressTypeCode>1</AddressTypeCode>
          <City />
          <County />
          <Country />
          <Fax />
          <FreightTermsCode>1</FreightTermsCode>
          <ImportSequenceNumber />
          <Latitude />
          <Line1 />
          <Line2 />
          <Line3 />
          <Longitude />
          <Name />
          <PostalCode />
          <PostOfficeBox />
          <PrimaryContactName />
          <ShippingMethodCode>1</ShippingMethodCode>
          <StateOrProvince />
          <Telephone1 />
          <Telephone2 />
          <Telephone3 />
          <TimeZoneRuleVersionNumber />
          <UPSZone />
          <UTCOffset />
          <UTCConversionTimeZoneCode />
        </Address>
      </Addresses>
    </Publisher>
    <RootComponents />
    <MissingDependencies />
  </SolutionManifest>
</ImportExportXml>`;
fs.writeFileSync(path.join(tempDir, 'solution.xml'), solutionXml);

// Create customizations.xml
const customizationsXml = `<?xml version="1.0" encoding="utf-8"?>
<ImportExportXml xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Entities />
  <Roles />
  <Workflows />
  <FieldSecurityProfiles />
  <Templates />
  <EntityMaps />
  <EntityRelationships />
  <OrganizationSettings />
  <optionsets />
  <CustomControls>
    <CustomControl>
      <Name>${controlName}</Name>
      <Version>1.0.0</Version>
      <CompatibleDataTypes>
        <CompatibleDataType>TwoOptions</CompatibleDataType>
        <CompatibleDataType>SingleLine.Text</CompatibleDataType>
        <CompatibleDataType>Multiple</CompatibleDataType>
      </CompatibleDataTypes>
      <Resources>
        <Resource>
          <Name>bundle.js</Name>
          <Type>JavaScript</Type>
        </Resource>
        <Resource>
          <Name>css/BooleanBlockCard.css</Name>
          <Type>CSS</Type>
        </Resource>
      </Resources>
    </CustomControl>
  </CustomControls>
  <SolutionPluginAssemblies />
  <EntityDataProviders />
</ImportExportXml>`;
fs.writeFileSync(path.join(tempDir, 'customizations.xml'), customizationsXml);

// Copy control files
const controlsDir = path.join(tempDir, 'Controls', `${publisherPrefix}_${controlName}`);
fs.mkdirSync(controlsDir, { recursive: true });

// Copy built control files
const sourceDir = path.join(__dirname, 'out', 'controls');
if (fs.existsSync(sourceDir)) {
    fs.cpSync(sourceDir, controlsDir, { recursive: true });
}

// Create zip file
const outputDir = path.join(__dirname, 'Solutions', 'BooleanBlockCardSolution', 'bin', 'Debug');
fs.mkdirSync(outputDir, { recursive: true });

const output = fs.createWriteStream(path.join(outputDir, 'BooleanBlockCardSolution.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function() {
    console.log(`Solution created: ${archive.pointer()} total bytes`);
    console.log('Solution package created at: Solutions/BooleanBlockCardSolution/bin/Debug/BooleanBlockCardSolution.zip');
    
    // Clean up temp directory
    fs.rmSync(tempDir, { recursive: true });
});

archive.on('error', function(err) {
    throw err;
});

archive.pipe(output);
archive.directory(tempDir, false);
archive.finalize();