function* loadProduct() {
  try{
    yield 1
    yield 2
    throw new Error('error');
    yield 3
  } catch(e) {
    console.log(e.message)
  }
}

function* watchSaga() {
  console.log('injectSaga');
  const product = loadProduct();
  
  while(true){
    const action = yield;
    if(action.type === 'pages/Product/LOAD_PRODUCT'){
      const res = product.next()
      console.log(res)
      
      if(res.done){
        console.log('끝');
      }
    } else {
      console.log('이 액션이 아님');
    }
  }
}

/*

const watch = watchSaga();
// => undefined

watch.next();
// => injectSaga
// => {value: undefined, done: false}

watch.next({type:'pages/Product/LOAD_PRODUCT_REQUEST'})
// => 이 액션이 아님
// => {value: undefined, done: false}

watch.next({type:'pages/Product/LOAD_PRODUCT'})
// => {value: 1, done: false}

watch.next({type: 'pages/Product/LOAD_PRODUCT'})
// => {value: 2, done: false}
// => {value: undefined, done: false}

watch.next({type: 'pages/Product/LOAD_PRODUCT'})
// => error
// => {value: undefined, done: true}
// => 끝
// => {value: undefined, done: false}

*/