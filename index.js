var ffi = require("ffi")
var ref = require("ref")
var ArrayType = require("ref-array")
var iopath = __dirname + '\\enumDeviceInfo.dll';
var iopath2 = __dirname + '\\ClientScreen_START.dll';

const charArray100=ArrayType(ref.types.char,500)

var DLL = ffi.Library(iopath , {
    'add' : ['int', ['int', 'int']],
    'EnumDevices': ['int', ['int','string','string']]
});

var DLL2 = ffi.Library(iopath2 , {
    'GetWorkingStatus' : ['int', []],
    'SetWorkingMode' : ['int', ['int']],
    'GetDeviceInfo' : ['int', ['int','string']],
     'GetVid' : ['int', ['int','string']]
   
});

//var bbb = DLL2.SetWorkingMode(0);
  //console.log(bbb)

  var aaa = DLL2.GetWorkingStatus();
  console.log(aaa)

var vid = Buffer.alloc(15);
  var ret = DLL2.GetVid(15,vid);
  console.log('GetVid:'+vid.toString('utf8').trim())
  
  
  var deviceInfo = Buffer.alloc(1000);
  console.log('#####1111')
  var ccc = DLL2.GetDeviceInfo(1000,deviceInfo);
   console.log(deviceInfo.length)
   console.log('GetDeviceInfo:'+deviceInfo.toString('hex').trim())
 console.log('GetDeviceInfo:'+ref.readCString(deviceInfo,0))
  
  const value1 = new charArray100()
  const bufferValue = Buffer.from('USB')
  for(let i=0;i<bufferValue.length;i++){
  	value1[i]=bufferValue[i]
  }
   const value2 = new charArray100()
   console.log('#####'+bufferValue.toString())
   var dev = Buffer.alloc(100);
  var result = DLL.EnumDevices(0, 'USB',dev)
  console.log('#####'+result)





