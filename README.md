# Sorting Visualizer

Welcome to my Sorting Visualizer! I built this application because I wanted to showcase my React skills while building something fun to use. Since sorting algorithms are an important prerequisite to algorithmic thinking, being able to visualize them will undoubtedly give a better understanding of each algorithm's key ideas.

I hope that you enjoy playing around with this visualization tool just as much as I enjoyed building it. You can access it here (use a Chromium browser for the best experience): 

https://theboyroy05.github.io/Sorting-Visualizer/

## Meet the Algorithms
Currently, I have implemented the following Sorting Algorithms:

**Selection Sort**: A simple algorithm which runs through the list iteratively and "selects" the smallest/largest item to sort.

**Bubble Sort**: A simple algorithm which runs through a list, comparing adjacent values, and performing swaps when necessary, allowing items towards the end to "bubble" up.

**Insertion Sort**: A simple algorithm which sorts a list by iteratively "inserting" each item into their sorted position.

**Heap Sort**: An algorithm which uses a data-structure called a "heap" to heapify the list before sorting it.

**Quick Sort**: A recursive algorithm which chooses a "partition" and recursively splits the list into two parts, one with items less than the partition, and the other with items that are greater.

**Merge Sort**: A recursive algorithm which splits the list into two halves and recursively sorts them before "merging" them together.

**Bozo Sort**: A terrible algorithm which checks if the list is sorted and if not, swaps two random elements, repeating this process until the list is sorted.

## Project Stack
Here is tech stack that I used for this project:

[**React**](https://react.dev/): The most popular JavaScript library currently that is used for creating UI components.

[**TypeScript**](https://www.typescriptlang.org/): An arguably better version of JavaScript with type checking. This was my first time using it, but it's easy to see how it let's you write safer code.

[**SWC**](https://swc.rs/): A Rust-based compiler that's 20x faster than the traditional JavaScript complier, [Babel](https://babeljs.io/).