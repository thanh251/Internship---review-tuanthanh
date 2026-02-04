// Travesing an Array --- Đi qua từng phần tử trong mảng
function a(){
    var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"],
        counter;

    for (counter = 0; counter < names.length; counter ++){
        console.log(names[counter])
    }
}
a();

//Use forEach to print all the names in an array
function b (){
    var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"];
    
    names.forEach(function(name){
        console.log(name);
    });
}
b();

//Projecting Arrays --- Chiếu mảng
// Là việc lấy dữ liệu gốc, áp dụng một hàm lên nó để tạo ra giá trị mới
function c () {
	var newReleases = [ //ký hiệu [ ] là mảng
		{ //ký hiệu { } là object
			"id": 70111470,
			"title": "Die Hard",
			"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": [4.0],
			"bookmark": []
		},
		{
			"id": 654356453,
			"title": "Bad Boys",
			"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": [5.0],
			"bookmark": [{ id: 432534, time: 65876586 }]
		},
		{
			"id": 65432445,
			"title": "The Chamber",
			"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": [4.0],
			"bookmark": []
		},
		{
			"id": 675465,
			"title": "Fracture",
			"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": [5.0],
			"bookmark": [{ id: 432534, time: 65876586 }]
		}
	];
    videoAndTitlePairs = [];

    newReleases.forEach(function(movies){ // coi từng cái obj trong Array là movies
        videoAndTitlePairs.push({title: movies.title, boxart: movies.boxart}); // method push để đẩy obj vào array mới
    }) // lấy từ array thì a.[] còn lấy obj thì a.
    return videoAndTitlePairs;
};

//Implement map()
// Hàm map() để biến đổi hoặc chiếu một mảng -> một mảng khác

//VD1
var videoAndTitlePairs = []; 
newReleases.forEach(function(movie) {
    videoAndTitlePairs.push({ id: movie.id, title: movie.title });
});

//VD2
Array.prototype.map = function(projectionFunction) {
	var results = [];
	this.forEach(function(itemInArray) {
    results.push(projectionFunction(itemInArray))

	});

	return results;
};

// VD3:   return newReleases.map (function (movies){ return {id: movies.id, title: movies.title};});

//Filtering Arrays --- Lọc mảng
newReleases.forEach(function(ratedMovies){
    if (ratedMovies.rating === 5.0){
      videos.push(ratedMovies);
    }
  });

//Implement filter()
Array.prototype.filter = function(predicateFunction) { //
	var results = [];
	this.forEach(function(itemInArray) {
	  if (predicateFunction(itemInArray)) {
		results.push(itemInArray);
	  }
	});

	return results;
};

//Query Data by Chaining Methods Calls
	return newReleases.
		filter(function(video) {
			return video.rating === 5.0;
		}). // lọc
		map(function(video) {
			return video.id;
		}); // lấy id

// Querying Trees: truy vấn các cấu trúc dạng cây
    movieLists.forEach(function(subList){
        subList.videos.forEach(function(video){
            allVideoIdsInMovieLists.push(video.id);
        });
    });

// Implement concatAll(): dùng để đi qua một mảng mà mỗi phần tử của nó cũng là một mảng
// concatAll() chỉ hoạt động chính xác khi mảng nguồn chứa các mảng con
// Ví dụ
Array.prototype.concatAll = function() {
    var results = [];

    this.forEach(function(subArray) {
        subArray.forEach(function(item) {
            results.push(item);
        });
    });
    return results; 
};

// ứng dụng của concatAll()
    return movieLists.
        map(function(movieList) {
            return movieList.videos.map(function(video) {
                return video.id;
            });
        }).
        concatAll(); //[70111470, 654356453, 65432445, 675465]


return movieLists.
        map(function(MovieLists){
            return movieLists.videos.map(function(video){
                return video.id;
            })
        })
        concatAll();

//Exercise 12: Retrieve id, title, and a 150x200 box art url for every video
        return movieLists. 
            map(function(MovieList){
                return movieList.videos
                .map(function(video){
                    return video.boxart. 
                    filter(function(boxart){
                        return width === 150 && height === 200;
                    })
                    .map (function(boxart){
                        return {id: video.id, title: video.title, boxart: boxart.url};
                    });
                }).
                concatAll();
            }).concatAll();

//exercise 13:  Implement concatMap()
Array.prototype.concatMap = function(projectionFunctionThatReturnsArray) {
	return this.
		map(function(item) {
      return projectionFunctionThatReturnsArray(item)
		}).
		concatAll();
};

//exercise 14: Use concatMap() to retrieve id, title, and 150x200 box art url for every video
return movieLists.concatMap(function(movieList) {
		return movieList.videos.concatMap(function(video) {
			return video.boxarts.
				filter(function(boxart) {
					return boxart.width === 150 && boxart.height === 200;
			  	}).
			  	map(function(boxart) {
					return {id: video.id, title: video.title, boxart: boxart.url};
				});
		  });
	  });

//exercise 15: Reducing Arrays, dùng forEach để tìm largest box art
function y() {
	var boxarts = [
			{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
			{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
			{ width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
			{ width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
		],
		currentSize,
		maxSize = -1,
		largestBoxart;

	boxarts.forEach(function(boxart) {
		currentSize = boxart.width * boxart.height;
		if (currentSize > maxSize) {
			largestBoxart = boxart;
			maxSize = currentSize;
		}
	});

	return largestBoxart;
}

//exercise 16:  Implement reduce(): giống như map nhưng trả về giá trị thay vì mảng
Array.prototype.reduce = function(combiner, initialValue) {
	var counter,
		accumulatedValue;
	if (this.length === 0) {
		return this;
	}
	else {
		if (arguments.length === 1) {
			counter = 1;
			accumulatedValue = this[0];
		}
		else if (arguments.length >= 2) {
			counter = 0;
			accumulatedValue = initialValue;
		}
		else {
			throw "Invalid arguments.";
		}
		while(counter < this.length) {
			accumulatedValue = combiner(accumulatedValue, this[counter])
			counter++;
		}
		return [accumulatedValue];
	}
};
//exercise 17: Retrieve the largest box art using reduce()
function y() {
	var ratings = [2,3,1,4,5];

	return ratings.
	  reduce(function(acc, curr) {
		if(acc > curr) {
		  return acc;
		}
		else {
		  return curr;
		}
	  });
}
//exercise 18: Retrieve the largest box art 
