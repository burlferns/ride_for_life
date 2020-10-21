import {useState, useEffect, useRef} from 'react';

/*
  This hook can measure the size of an element. It has to be called in the following way:
  const [elemRef,elemSize] = useSizeObserver();

  where:
    elemRef must be set to the ref attribute of the ReactDOMelement that is to be measured
    elemSize is an object that contains the width and height of the measured ReactDOMelement
    So the height is obtained as elemSize.height and the width as elemSize.width 
*/
export const useSizeObserver = function () {
  const elemRef = useRef(null);  //Reference to element that is measured
  const observerRef = useRef(null); //Reference to the resizeObserver object
  const [elemSize,setElemSize] = useState({width:0, height:0}); //This stores the measurements 
                                                                //of the element

  useEffect(()=>{
    observerRef.current = new ResizeObserver(entries=>{
      const entry = entries[0]; //The ResizeObserver can observe more than one element at a time
                                //so that is why entries is an array of measurement objects for 
                                //each of the elements that ResizeObserver observes. In this hook,
                                //since the resizeObserver is only looking at one element, we only 
                                //use the first entry in the array
      setElemSize({width:entry.contentRect.width, height:entry.contentRect.height});
    });
    observerRef.current.observe(elemRef.current);

    //I was getting a warning from React when I used elemRef.current in the unobserver function
    //that is run on dismount, saying: 
    //    "The ref value 'elemRef.current' will likely have changed by the time this effect cleanup
    //    function runs. If this ref points to a node rendered by React, copy 'elemRef.current'
    //    to a variable inside the effect, and use that variable in the cleanup function"
    //So that is why the variable refToElement is used here 
    const refToElement = elemRef.current;

    return ()=>{observerRef.current.unobserve(refToElement)};
  },[])
  
  return [elemRef,elemSize]
}