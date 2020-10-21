function convertEx() {
    var sheet = SpreadsheetApp.getActive();


    var confirm = SpreadsheetApp.getUi().alert('Start convert?', SpreadsheetApp.getUi().ButtonSet.YES_NO);

    if (confirm == SpreadsheetApp.getUi().Button.NO) return;

    var spfsheet = sheet.getSheetByName('import_order');
    var wpsheet = sheet.getSheetByName('export_order')
    if (wpsheet.getDataRange().getNumRows() > 1)
        wpsheet.getRange(2, 1, wpsheet.getDataRange().getNumRows() - 1, 20).clear();
    var spfdata = spfsheet.getDataRange().getValues();
    var wpdata = [];
    //Order,Product Type,Variant,Title,Quantity,Price,Shipping,Fullname,Address1,Address2,City,Country,Code,Zip,Phone,e-mail,Note,Image,Url,SKU
    for (k = 1; k < spfdata.length; k++) {
        let row_import = spfdata[k];
        // let product_type = getLastSymbol(row_import[16]);
        // let variant = getVariant(row_import[2]);
        let product_type = row_import[16];
        firstrow = [row_import[0], product_type, row_import[2], row_import[3], row_import[4], row_import[6], row_import[5], "", row_import[7], "", row_import[8], row_import[9], row_import[11], row_import[10], row_import[21], row_import[15], product_type, row_import[17], row_import[20]];
        wpdata.push(firstrow);
    }

    wpsheet.getRange(2, 1, wpdata.length, wpdata[0].length).setValues(wpdata);
}

function getLastSymbol(text = "") {
    if (checkExitstring("_", text)) {
        let myarr = text.split("_");
        let last_count = myarr.length - 1;
        return myarr[last_count];
    };
    return text;
}

function getVariant(text = "") {
    if (checkExitstring("|", text)) {
        let myarr = text.split("|");
        let variant_type = "";
        if (myarr.length > 4) {
            variant_type = "-" + myarr[myarr.length - 2].trim();
        }
        let variant = myarr[1].trim() + variant_type;
        return variant;
    };
    return text;
}

function checkExitstring(string, check) {
    if (check.indexOf(string) == -1) {
        return false;
    }
    return true;
}