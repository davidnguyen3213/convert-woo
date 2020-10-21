function onOpen(){
    SpreadsheetApp.getUi().createMenu('Convert').addItem('Convert Shopify to Wordpress', 'convertSpf')
    .addItem('Convert Shopify to Wordpress New', 'testConvertSpf')
    .addItem('Convert export order Woo', 'convertEx')
    .addToUi();
 }
 
 