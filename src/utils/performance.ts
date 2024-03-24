export const performanceTest1 = () => {
  const startTime = performance.now();
  const cellGrid = Array.from({ length: 10000 }, (_, i) => {
    return Array.from({ length: 1000 }, (_, j) => {
      return {
        cellStyles: {},
        contentStyles: {},
        selected: false,
        address: '',
      };
    });
  });
  const endTime = performance.now();
  console.log(endTime - startTime);
}

const performanceTest2 = () => {
  const startTime = performance.now();
  let cellGrid = [];

  for(let i = 0; i < 10000; ++i){
    let row = [];
    for(let j = 0; j < 1000; ++j){
      row.push({
        cellStyles: {},
        contentStyles: {},
        selected: false,
        address: '',
      })
    }
    cellGrid.push(row)
  }
  
  const endTime = performance.now();
  console.log(endTime - startTime);
}

// performanceTest1();
performanceTest1();