
let isTrackPad;
let eventCount = 0;
let eventCountStart;


const detectTrackpad = evt => {
  const isTrackPadDefined = isTrackPad || typeof isTrackPad !== "undefined";
  
  if (isTrackPadDefined) return;
  
  if (eventCount === 0) {
    eventCountStart = performance.now();
  }

  eventCount++;

  if (performance.now() - eventCountStart > 66) {
    if (eventCount > 5) {
      isTrackPad = true;
    } else {
      isTrackPad = false;
    }
    isTrackPadDefined = true;
  }
};

