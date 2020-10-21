import {useState, useEffect, useRef, useContext} from 'react';

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
      const entry = entries[0];
      setElemSize({width:entry.contentRect.width, height:entry.contentRect.height});
    });
    observerRef.current.observe(elemRef.current);

    return ()=>{observerRef.current.unobserve(elemRef.current)};
  },[])
  
  return [elemRef,elemSize]
}