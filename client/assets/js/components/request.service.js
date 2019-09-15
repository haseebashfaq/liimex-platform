(function() {

    'use strict';

    angular.module('application').
    service('requestService', requestService);

    requestService.$inject = ['$resource', '$rootScope', 'firebase', '$firebaseObject', 'authService'];

    /* Get Dynamic Endpoint */
    /* Needed to reset endpoint between users sign in/out */
    function getEndpoint(routeList, route_only){
        var route = "";
        for(var i in routeList){
          route = route.concat(routeList[i],'/');
        }
        console.log('Requested Route:',route);
        if(route_only === true){
          return {route:route}
        } else {
          return {ref:firebase.database().ref().child(route),
route:route};
        }
    }

    /* Service Function */
    function requestService($resource, $rootScope, firebase, $firebaseObject, authService) {

        /* Hold Data Tempeorarily */
        var temp_hold_data = null;

        /* Add Timestamps */
        function addTimestamps(data){
            data.created_at = firebase.database.ServerValue.TIMESTAMP;
            data.updated_at = firebase.database.ServerValue.TIMESTAMP;
            return data;
        }

        /* Get Time */
        function getTimestamp(){
          return firebase.database.ServerValue.TIMESTAMP
        }

        /* Update Timestamps */
        function updateTimestamps(data){
            data.updated_at = firebase.database.ServerValue.TIMESTAMP;
            return data;
        }

        /* Push Data */
        function pushData(route, data, callback, err_call){
          data = addTimestamps(data);
          var dataRef = getEndpoint(route).ref;
          dataRef.push(data).then(response => {
              if(callback){
                callback(response);
              }
          }, error => {
              if(err_call){
                err_call(error);
              }
          });
        }

        /* Update Data */
        function updateData(route, data, callback, err_call, remove_time=false, add_timestamp=false){
          if(!remove_time){
            data = updateTimestamps(data);
          }
          if(add_timestamp){
            data.timestamp = firebase.database.ServerValue.TIMESTAMP;
          }
          var dataRef = getEndpoint(route).ref;
          dataRef.update(data).then(() => {
            if(callback){
              callback();
            }
          }, error => {
              if(err_call){
                err_call(error);
              }
          });
        }

        /* Deep Write */
        function deepWrite(route_list, first_push ,callback, err_call){
          var newUpdate = {};
          var master;

          // Iterate non slaves
          for(var key in route_list){
            var item = route_list[key];
            if(item.slave === true){
 continue
}
            var endpoint = getEndpoint(item.route);
            var dataRef = endpoint.ref.push();
            var dataKey = dataRef.key;
            endpoint.route += item.uid || dataKey;
            master = item.master === true ? dataKey : master;
            item.data = first_push === true ? addTimestamps(item.data) : item.data
            newUpdate[endpoint.route] = item.data;
          }

          // Iterate slaves
          for(var key in route_list){
            var item = route_list[key];
            if(item.slave !== true) {
 continue
}
            var endpoint = getEndpoint(item.route);
            var dataRef = endpoint.ref.push();
            var dataKey = dataRef.key;
            endpoint.route += item.uid || dataKey;
            item.data[item.master_name] = master;
            item.data = first_push === true ? addTimestamps(item.data) : item.data
            newUpdate[endpoint.route] = item.data;
          }

          // Do a deep-path update
          firebase.database().ref().update(newUpdate).then(() => {
            if(callback){
              callback();
            }
          }, error => {
              if(err_call){
                err_call(error);
              }
          });
        }

        /* Attach and Update */
        function attachAndUpdate(route_list, callback, err_call){
          var newUpdate = {};
          var attach_for = {};
          var attach_to = {};

          for(var key in route_list){
            var item = route_list[key];
            var endpoint = getEndpoint(item.route);
            var dataRef = endpoint.ref.push();
            var dataKey = dataRef.key;
            if(item.attach_to === true || item.no_new_key){
 dataKey=''
}
            endpoint.route += dataKey;
            newUpdate[endpoint.route] = item.data;
            if(item.attach_to){
              attach_to[endpoint.route] = item;
            }
            if(item.attach_for){
              attach_for[endpoint.route] = {item:item,
dataKey:dataKey};
            }
          }

          for(var to_key in attach_to){
            for(var for_key in attach_for){
              if(attach_to[to_key].name === attach_for[for_key].item.attach_on){
                delete newUpdate[to_key];
                if(attach_for[for_key].item.overwrite_existing){
                  var new_key = to_key+attach_for[for_key].item.under;
                  newUpdate[new_key] = {};
                  newUpdate[new_key][attach_for[for_key].dataKey] = true;
                } else {
                  var new_key = to_key+attach_for[for_key].item.under+'/'+attach_for[for_key].dataKey;
                  newUpdate[new_key] = true;
                }
              }
            }
          }

          // Do a deep-path update
          firebase.database().ref().update(newUpdate).then(() => {
            if(callback){
              callback();
            }
          }, error => {
              if(err_call){
                err_call(error);
              }
          });
        }

        // Get Multiple Keys
        function getMultipleKeys(route_list, callback){
          var key_list = {};
          for (var key in route_list){
            var endpoint = getEndpoint(route_list[key].route);
            var dataRef = endpoint.ref.push();
            var dataKey = dataRef.key;
            key_list[route_list[key].name] = {};
            key_list[route_list[key].name].route = endpoint.route;
            key_list[route_list[key].name].key = dataKey;
          }
          callback(key_list);
        }

        // Multu Path update
        function multiPathUpdate(newUpdate, callback, err_call){
          firebase.database().ref().update(newUpdate).then(() => {
            if(callback){
              callback();
            }
          }, error => {
              if(err_call){
                err_call(error);
              }
          });
        }

        /* Set Data */
        // Requires manual UID
        function setData(route, data, callback, err_call, remove_time){
          if(!remove_time){
            data = addTimestamps(data);
          }
          var dataRef = getEndpoint(route).ref;
          dataRef.set(data).then(() => {
            if(callback){
              callback();
            }
          }, error => {
              if(err_call){
                err_call(error);
              }
          });
        }

        /* Delete Data */
        function deleteData(route, callback, err_call){
          var dataRef = getEndpoint(route).ref;
          dataRef.remove().then(() => {
            if(callback){
              callback();
            }
          }, error => {
              if(err_call){
                err_call(error);
              }
          });
        }

        /* Get Data Once */
        function getDataOnce(route, callback, err_call){
          var dataRef = getEndpoint(route).ref;
          dataRef.once('value').then(snapshot => {
              var data = snapshot.val()
              if(callback){
                callback(data);
              }
          }, error => {
              console.error(error);
              if(err_call){
                err_call(error);
              }
          });
        }

        /* Get Data Once And Cache */
        function getDataOnceAndCache(route, callback, err_call){
          var dataRef = getEndpoint(route).ref;
          if(temp_hold_data !== null && temp_hold_data !== undefined){
            callback(temp_hold_data)
          }else {
            dataRef.once('value').then(snapshot => {
                var data = snapshot.val()
                temp_hold_data = data;
                if(callback){
                  callback(data);
                }
            }, error => {
                console.error(error);
                if(err_call){
                  err_call(error);
                }
            });
          }
        }

        /* Get Data Once With Filter */
        function getDataOnceEqualTo(route, sort_param, sort_value, callback, err_call){
          var dataRef = getEndpoint(route).ref;
          if(sort_value == undefined) {
 return
}
          dataRef.orderByChild(sort_param).equalTo(sort_value).once('value').then(snapshot => {
              var data = snapshot.val()
              if(callback){
                callback(data);
              }
          }, error => {
              console.error(error);
              if(err_call){
                err_call(error);
              }
          });
        }

        /* On Child Value Changed */
        function on_child_value(route, callback, err_call){
          var ref = getEndpoint(route).ref;
          ref.on("value", (snapshot, prevChildKey) => {
            callback(snapshot);
          }, err_call);
        }

        /* On Child Value Changed With Params */
        function on_child_value_order_by(route, sort_param, sort_value, callback, err_call){
          var ref = getEndpoint(route).ref;
          ref.orderByChild(sort_param).equalTo(sort_value).on("value", (snapshot, prevChildKey) => {
            callback(snapshot);
          }, err_call);
        }

        /* Get Liimex API Request With Params */
        function getLiimexResourceWithParams(endpoint, params, callback, err_call){
          var new_resource = $resource(endpoint);
          var resource_call = new_resource.get(params, response => {
            var data = response.data;
            callback(data);
          }, error => {
            if(err_call){
                err_call();
            }
            console.error('Server Error', error);
          });
        }

        /* Get request no params */
        function getResource(url, params, callback, err_call){
          var new_resource = $resource(url);
          var resource_call = new_resource.query(params,response => {
            callback(response);
          },error => {
            if(err_call){
            err_call();
            }
            console.log('Server Error', error);
          });
        }

        /* Post to  Liimex API Request With Params */
        function postLiimexResourceWithParams(endpoint, params, callback, err_call){
            const new_resource = $resource(endpoint);
            new_resource.save(params, response => {
                if (typeof callback === 'function') {
                    callback(response);
                }
            }, error => {
                if (typeof err_call === 'function'){
                    err_call();
                }
                console.error('Server Error', error);
            });
        }

        /* Return Stuff */
        return {
          pushData : pushData,
          updateData : updateData,
          deepWrite : deepWrite,
          getDataOnce : getDataOnce,
          deleteData : deleteData,
          setData : setData,
          getDataOnceEqualTo : getDataOnceEqualTo,
          getDataOnceAndCache : getDataOnceAndCache,
          on_child_value : on_child_value,
          on_child_value_order_by : on_child_value_order_by,
          attachAndUpdate : attachAndUpdate,
          getLiimexResourceWithParams : getLiimexResourceWithParams,
          postLiimexResourceWithParams : postLiimexResourceWithParams,
          getMultipleKeys : getMultipleKeys,
          multiPathUpdate : multiPathUpdate,
          getTimestamp : getTimestamp,
          getResource : getResource
        }
    }
})();
