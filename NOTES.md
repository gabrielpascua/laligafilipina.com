### Word Counter

```js
var excludes = [
    'she', 'her', 'him', 'his', 'had', 'have', 'will',
    'the', 'news', 'from', 'for', 'has', 'its', 'was',
    'who', 'may', 'not', 'which', 'one', 'men', 'with',
    'this', 'more', 'over', 'and', 'you', 'your', 'are',
    'get', 'that', 'should', 'would', 'could', 'philippines',
    'philippine', 'ago', 'day', 'days', 'minutes', 'minute',
    'hour', 'hours', 'month', 'months', 'into', 'how', 'new',
    'can', 'about', 'ang'
];

function wordFilter(accumulator, word) {
    var MIN_LENGTH = 3;
    var cleanWord = word.replace(/\W/gi, '');

    if (!!(cleanWord) && 
        excludes.indexOf(cleanWord) === -1 &&
        cleanWord.length >= MIN_LENGTH
    ){
        accumulator.push(cleanWord);
    }

    return accumulator;
}

function descendingSort(a)
{
    var swapp;
    var n = a.length-1;
    var x=a;
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {
            if (x[i].count < x[i+1].count)
            {
               var temp = x[i];
               x[i] = x[i+1];
               x[i+1] = temp;
               swapp = true;
            }
        }
        n--;
    } while (swapp);
 return x; 
}

var wordMap = new Map();
var words = document.querySelector('body')
        .innerText
        .replace(/\s/gi, ' ')
        .toLowerCase()
        .split(' ')
        .reduce(wordFilter, [])
        .map(w => {
            const count = wordMap.get(w);
            if (count) {
                wordMap.set(w, count+1);
            } else {
                wordMap.set(w, 1);
            }
        });

var hostName = window.location.hostname;
var MIN_WEIGHT = 3;
var weightedWords = [];
for (let [key, value] of wordMap) {
    if (value >= MIN_WEIGHT) {
        weightedWords.push({
            hostName,
            word: key,
            count: value
        });
    }
}

console.clear();
console.table(descendingSort(weightedWords));
```