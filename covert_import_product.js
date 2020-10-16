function convertSpf() {
    var sheet = SpreadsheetApp.getActive();
    
    
    var confirm = SpreadsheetApp.getUi().alert('Start convert?', SpreadsheetApp.getUi().ButtonSet.YES_NO);
  
    if(confirm == SpreadsheetApp.getUi().Button.NO) return;
    
     var spfsheet = sheet.getSheetByName('shopify');
     var wpsheet = sheet.getSheetByName('wordpress')
     if(wpsheet.getDataRange().getNumRows()>1)
     wpsheet.getRange(2, 1, wpsheet.getDataRange().getNumRows()-1, 10).clear();
    var spfdata = spfsheet.getDataRange().getValues();
    var wpdata = [];
    
    //Type,SKU,Name,Published,Description,Sale price,Regular price,Categories,Tags,Images
    var firstrow = ['simple',spfdata[1][0],spfdata[1][1],1,spfdata[1][2],spfdata[1][19],spfdata[1][20],spfdata[1][3],spfdata[1][5],spfdata[1][23]];
    for(k=1;k< spfdata.length;k++){
     
      if(firstrow[1] == spfdata[k][0] ){
        firstrow[9]+= (spfdata[k][23]!='')?','+spfdata[k][23]:'';
        if( k == Number(spfdata.length)- 1){
           wpdata.push(firstrow);
           firstrow = ['simple',spfdata[k][0],spfdata[k][1],1,spfdata[k][2],spfdata[k][19],spfdata[k][20],spfdata[k][3],spfdata[k][5],spfdata[k][23]];
         }
      }
      else{
         wpdata.push(firstrow);
        firstrow = ['simple',spfdata[k][0],spfdata[k][1],1,spfdata[k][2],spfdata[k][19],spfdata[k][20],spfdata[k][3],spfdata[k][5],spfdata[k][23]];
      }
    }
    
    wpsheet.getRange(2,1, wpdata.length, wpdata[0].length).setValues(wpdata);
  }
  