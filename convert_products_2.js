function testConvertSpf() {
  var sheet = SpreadsheetApp.getActive();
  
  
  var confirm = SpreadsheetApp.getUi().alert('Start convert?', SpreadsheetApp.getUi().ButtonSet.YES_NO);

  if(confirm == SpreadsheetApp.getUi().Button.NO) return;
  
    var spfsheet = sheet.getSheetByName('shopify');
    var wpsheet = sheet.getSheetByName('wordpress')
    if(wpsheet.getDataRange().getNumRows()>1)
    wpsheet.getRange(2, 1, wpsheet.getDataRange().getNumRows()-1, 30).clear();
  var spfdata = spfsheet.getDataRange().getValues();
  var count_data = 0;
  var data = [];
  var data_flag = [];
  var flag = 1;
  var position = 0;
  var data_push = [];
  var array_attribue_1 = [];
  var array_attribue_2 = [];
  //Type,SKU,Name,Published,Visibility in catalog,Description,Tax status,Tax class,In stock?,Stock,Sale price,Regular price,Categories,Tags,Images
  //0->29
  var data_first = ['variable',spfdata[flag][4],spfdata[flag][0],spfdata[flag][1],1,"visible",spfdata[flag][2],"taxable","",1,10,1,1,"","",spfdata[flag][3],spfdata[flag][5],spfdata[flag][24],"",position,spfdata[flag][7],"",1,0,spfdata[flag][8],spfdata[flag][9],"",1,1,spfdata[flag][10]];
  for(k=1;k< spfdata.length;k++){
    
    if(data_first[2] == spfdata[k][0] ){
      position += 1;
      data_first[17] += (spfdata[k][24]!='')?','+spfdata[k][24]:'';
      array_attribue_1.push(spfdata[k][8]);
      array_attribue_2.push(spfdata[k][10]);
      data_push = ['variation',spfdata[k][13],spfdata[flag][0],spfdata[flag][1],1,"visible","","taxable","parent",1,"",0,0,spfdata[k][19],spfdata[k][20],"","",spfdata[k][43],spfdata[flag][4],position,spfdata[flag][7],spfdata[k][8],"",0,"",spfdata[flag][9],spfdata[k][10],"",1,""];
      data_flag.push(data_push);
      if( k == Number(spfdata.length)- 1){
        data_first[21] = getAttribute(array_attribue_1);
        data_first[26] = getAttribute(array_attribue_2);
        data = [].concat([data_first],data_flag);
        wpsheet.getRange(2 + count_data,1, data.length, data[0].length).setValues(data);
       }
    }
    else{
      var count_attr = array_attribue_1.filter(onlyUnique);
      if(count_attr.length == 1){
        data_first[0] = "simple";
        data_first[13] = spfdata[k][19];
        data_first[14] = spfdata[k][20];
        data = [data_first];
      }
      else{
        data_first[21] = getAttribute(array_attribue_1);
        data_first[26] = getAttribute(array_attribue_2);
        data = [].concat([data_first],data_flag);
      }
      wpsheet.getRange(2 + count_data , 1 , data.length, data[0].length).setValues(data);
      count_data += data.length;
      flag = k;
      array_attribue_1 = [];
      array_attribue_2 = [];
      position = 0;
      data = [];
      data_flag = [];
      data_first = ['variable',spfdata[flag][4],spfdata[flag][0],spfdata[flag][1],1,"visible",spfdata[flag][2],"taxable","",1,10,1,1,"","",spfdata[flag][3],spfdata[flag][5],spfdata[flag][24],"",position,spfdata[flag][7],"",1,0,spfdata[flag][8],spfdata[flag][9],"",1,1,spfdata[flag][10]];
      data_push = ['variation',spfdata[k][13],spfdata[flag][0],spfdata[flag][1],1,"visible","","taxable","parent",1,"",0,0,spfdata[k][19],spfdata[k][20],"","",spfdata[k][43],spfdata[flag][4],++position,spfdata[flag][7],spfdata[k][8],"",0,"",spfdata[flag][9],spfdata[k][10],"",1,""];
      data_flag.push(data_push);
      array_attribue_1.push(spfdata[k][8]);
      array_attribue_2.push(spfdata[k][10]);
    }
  }
  //wpsheet.getRange(2,1, wpdata.length, wpdata[0].length).setValues(wpdata);
}
function onlyUnique(value, index, self) {
  if( value != ""){
  	return self.indexOf(value) === index;
  }
}
function getAttribute(array_attr){
  arr = array_attr.filter(onlyUnique);
  return arr.join(",");
}