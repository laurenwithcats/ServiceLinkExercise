$( '#sortable' ).sortable({
  	handle: '.catOrder',
    placeholder: 'cat-state-highlight',
    helper: 'clone',
    update: function(event, ui) {
        var $lis = $( this ).children('tr');
		$lis.each( function() {
            var $li = $( this );
            var newVal = $( this ).index() + 1;
            $( this ).children( '.catSeq' ).children( 'span' ).html(newVal);
            $( this ).children( '#item_display_order' ).val(newVal);
        });
    }
});

//function to recount the tr items 
//having issues with the object above calling this function under update: 
function updateOrder(event, ui) {
        var $lis = $( '#sortable' ).children('tr');
        $lis.each( function() {
            var $li = $( this );
            var newVal = $( this ).index() + 1;
            $( this ).children( '.catSeq' ).children( 'span' ).html(newVal);
            $( this ).children( '#item_display_order' ).val(newVal);
        });
    }
    
//function to show the new category line   
function showCategory(e) {
  e.preventDefault();
  //update seq number
  var seqNum = $( '#sortable' ).children().length +1;
  //add the Add Category Row 
  $( '#sortable:last-child' ).append('<tr class="cat newCat">' + 
  		'<td class="catOrder"><i class="fas fa-bars"></i></td>' + 
  		'<td class="catName"><form><input id="newCatName" class="form-control" type="text" placeholder="Category Name"></form></td>' + 
  		'<td class="catSeq"><span>7</span></td>' +	
  		'<td><a id="catSave" href="#">Save</a></td>' +
  	'</tr>');

  $( '.newCat' ).children( '.catSeq' ).children( 'span' ).html(seqNum);
  //disable link to add category
  $( '#addCat' ).addClass( 'disabled' );
}

//function to save the new category
function saveCategory(e) {
	e.preventDefault();
	
	//grab the name from the form input
	var catName = $( '#newCatName' ).val();
	var seqNum = $( '#sortable' ).children().length +1;
	//check if there is content in there 
	if (catName != '') {
		//write the new table row
		$( '#sortable:last-child' ).append('<tr class="cat">' + 
  			'<td class="catOrder"><i class="fas fa-bars"></i></td>' + 
	  		'<td class="catName">' + catName +'</td>' + 
	  		'<td class="catSeq"><span>' + seqNum + '</span></td>' + 
	  		'<td class="catDel"><span>x</span></td>' + 
	  	'</tr>');
		//remove Add Category Row
	  	$('.newCat').remove();  
		//Renumber
		updateOrder();
		//clear contents of the row
		$('#newCatName').val('');
		//un-disable link to add category
	  	$( '#addCat' ).removeClass( 'disabled' );
	} else {
		//alert user that they must input something 
		alert('Please enter a Category Name');
	}	
}

$( '#sortable' ).disableSelection();
$( 'body' ).on('click', '.catDel', function() { 
    $(this).parent().remove();
    updateOrder();
});
$( 'body' ).on('click', '#addCat', showCategory );
$( 'body' ).on('click', '#catSave', saveCategory );


  
  