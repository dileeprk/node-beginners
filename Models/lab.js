//console.log for BETTER UNDERSTANDING WHILE EXECUTING ON LOCAL MACHINE!
//Module Dependencies

var mongoose=require('mongoose'),
Schema=mongoose.Schema

var LabSchema = new Schema({
 pat_name: {type: String, default : ''},
 doc_name: {type: String, default : ''},
 blood : {type: String, default: ''},
 haemo : {type: Number, default: ''},
 sugar : {type: Number, default: ''},
 bp: {type:String, default: ''},
  
 user: {type : Schema.ObjectId, ref : 'Login'},
 createdAt  : {type : Date, default : Date.now}
})

//Validations

LabSchema.path('pat_name').validate(function (pat_name) {
	console.log("Checking pat_name");
    return pat_name.length
}, 'Patient name cannot be blank')


LabSchema.path('doc_name').validate(function (doc_name) {
	console.log("Checking doc_name");
    return doc_name.length
}, 'Doctor name cannot be blank')


LabSchema.path('blood').validate(function (blood) {
	console.log("Checking blood type");
    return blood.length
}, 'Blood type cannot be blank')


LabSchema.path('haemo').validate(function (haemo) {
	console.log("Checking haemo2 "+haemo);
	if(haemo<25){
	console.log(haemo);
	console.log("Haemo value is less than 25");
	 return true;
	}
    return false;
}, 'Invalid Haemoglobin count')


LabSchema.path('haemo').validate(function (haemo) {
	console.log("Checking haemo");
    return haemo
}, 'Haemoglobin level cannot be blank')




LabSchema.path('sugar').validate(function (sugar) {
	console.log("Checking sugar");
    return sugar
}, 'Sugar level cannot be blank')

LabSchema.path('sugar').validate(function (sugar) {
	console.log("Checking sugar2 "+sugar);
	if(sugar<15){
	console.log("Sugar level is less than 15");
	 return true;}
    return false
}, 'Invalid Sugar level')

LabSchema.path('bp').validate(function (bp) {
	console.log("Checking bp");
    return bp.length
}, 'BP cannot be blank')

LabSchema.path('bp').validate(function (bp) {
	console.log("Checking bp2");
	if(bp.indexOf('/') > -1){
		console.log("bp contains /");
		return true;
	}
    return false
}, 'BP format: systolic/diastolic')



LabSchema.post('remove', function (lab) {
console.log('%s has been removed', lab._id);

})



LabSchema.statics = {

 

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('login', 'name email username')
      
      .exec(cb)
  },

//find patient using name
searchpat: function (patient, done, cb) {
	console.log("in lab.searchpat");
    this.findOne({ pat_name: patient }, function (err, lab) {
        if (err) { console.log("Error!");
			return done(err) }


if (!lab) { console.log("Patient not found");
          return done(null, false, { message: 'Patient not found' })
        }
	console.log("No errors ")
        return done(null, lab)
      })
      .exec(cb)
  },

 

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('login', 'name username')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }

}


mongoose.model('Lab', LabSchema)
