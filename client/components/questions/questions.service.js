'use strict';

angular.module('its110App')
  .factory('questions', function ($http) {
    var o = {
      questions: []
    };

    // Public API
    return {
      getAll: function () {
        return $http.get('/api/questions').success(function(data) {
          angular.copy(data, o.questions);
        });
      },

      create: function(question) {
        return $http.post('/api/questions', question).success(function(data) {
          o.questions.push(data);
        });
      },

      import: function(questions) {
        return $http.post('/api/questions/import', questions).success(function(data) {
          angular.extend(o.questions, data);
        });
      },

      // get: function(id) {
      //   /* this worked fine - with $scope.question = question; after the js resolve
      //   return $http.get('/api/questions/' + id).then(function(res){
      //     return res.data;
      //   }); */
      //   return $http.get('/api/questions/' + id).success(function(res){
      //     return res;
      //   });
      // },

      // addQuestion: function(questionID, question) {
      //   return $http.post('/api/questions/' + questionID + '/questions', question);
      //   // FIXME: add question to o object here explicitly??
      // },

      editQuestion: function(id, question) {
        return $http.put('/api/questions/' + id, question).success(function(data) {
          o.questions.forEach(function(ea) {
            if (ea._id === data.question) {
              ea.questions.forEach(function(q) {
                if (q._id === data._id) {
                  q = data;
                }
              });
            }
          });   
        });
      },

      // must delete question, and delete reference to it in question
      delete: function(question, questionID) {
        $http.delete('/api/questions/' + question._id);
        console.log('successfully deleted q');
      },

      // editquestion: function(id, question) {
      //   question.questions.forEach(function(ea, i) {
      //     question.questions[i] = ea._id;
      //   });

      //   return $http.put('/api/questions/' + id, question).success(function(data) {
      //     //var index = o.questions.indexOf(data._id);
      //     o.questions.forEach(function(ea) {
      //       if (ea._id === data._id) {
      //         angular.copy(data, ea);
      //       }
      //     });
      //   });
      // }
    }; // end return object
  });
