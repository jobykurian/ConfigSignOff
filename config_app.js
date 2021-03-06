// File: chapter5/item-service-using-service/app.js

function ItemService() {
  var changed_flag = false;
  var submited_flag = false;
  var items = [
    {id: 1, table: 'Item 0', label: 'No Changes', owner: 'Operation',status: false},
    {id: 2, table: 'Item 1', label: 'No Changes', owner: 'Operation',status: false},
	{id: 3, table: 'Item 2', label: 'No Changes', owner: 'Model',status: false},
	{id: 4, table: 'Item 3', label: 'No Changes', owner: 'Business',status: false}
  ];
  //var tmp_items = items;
  var tmp_items = JSON.parse(JSON.stringify(items));
  this.list = function(ConfigStaus) {
    return items.filter((elem,index)=>elem.status == ConfigStaus);
  };
  this.add = function(item) {
    items.push(item);
  };
  this.changed = function()
  {
	   return changed_flag;
  }
  this.submited = function(){
	  return submited_flag;
  }
  
  this.submit = function()
  {
	  
	  var arrayLength = tmp_items.length;
	  submited_flag = true;
	 for (var i = 0; i < arrayLength; i++) {
		 if (!items[i].status)
		 {
			items[i].status = arraysAreEqual(items[i],tmp_items[i]);
			console.log(JSON.stringify(items[i])+"---"+JSON.stringify(tmp_items[i]));
		 }
	 }
	  for (var i = arrayLength; i < items.length; i++) {
		  items[i].status = true;
	  }
    //Do something
	  for (i = 0; i < items.length; i++)
	  {
		  if (items[i].status)
		 {
			 changed_flag = true;
			 break;
		 }
	}
  }
  function arraysAreEqual(ary1,ary2){
	    console.log(ary1.label != ary2.label);
		return (ary1.label != ary2.label || ary1.table != ary2.table || ary1.owner != ary2.owner);
	}
}

angular.module('notesApp', [])
  .controller('MainCtrl', [function() {
    var self = this;
    self.tab = 'first';
	
    self.open = function(tab) {
      self.tab = tab;
    };
  }])
  .controller('SubCtrlChnged',
      ['ItemService', function(ItemService) {
    var self = this;
	var ConfigStaus = true;
    self.list = function() {
      return ItemService.list(ConfigStaus);
    };

    self.add = function() {
      ItemService.add({
        id: self.list().length + 1,
        label: 'Item ' + self.list().length,
		status: true
      });
    };
	
	self.changed = function(){
		console.log("In changed "+ItemService.changed());
		return ItemService.changed();
	};
	self.notchanged = function(){
		console.log("In notchanged :"+ !ItemService.changed());
		return !ItemService.changed();
	};
  }])
  .controller('SubCtrlUnChnged',
      ['ItemService', function(ItemService) {
    var self = this;
	var ConfigStaus = false;
    self.list = function() {
      return ItemService.list(ConfigStaus);
    };

    self.add = function() {
      ItemService.add({
        id: self.list().length + 1,
        label: 'Item ' + self.list().length,
		status: false
      });
    };
	
	self.submit = function() {
		console.log("In submit"); 
      ItemService.submit();
    };
	self.submited = function(){
		console.log("In submited"+ItemService.submited());
		return ItemService.submited();
	};
	self.notsubmited = function(){
		console.log("In notsubmited :"+ !ItemService.submited());
		return !ItemService.submited();
	};
	
  }])
  .service('ItemService', [ItemService]);