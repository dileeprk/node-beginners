$(document).ready(function () {

  // confirmations
  $('.confirm').submit(function (e) {
    e.preventDefault();
      bootbox.confirm('Are you sure you want to save changes?', 'Cancel', 'Save Changes', function (action) {
      if (action) {
        $('.confirm').unbind('submit');
        $('.confirm').trigger('submit');
      }
    });
  });
  
$('.confirmdel').submit(function (e) {
    e.preventDefault();
      bootbox.confirm('Are you sure you want to delete entry?', 'Cancel', 'Delete', function (action) {
      if (action) {
        $('.confirmdel').unbind('submit');
        $('.confirmdel').trigger('submit');
      }
    });
  });

$('.faillogin').submit(function (e) {
    e.preventDefault();
      bootbox.alert('Invalid username or Password');
    
  });
 

});
