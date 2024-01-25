import { imgList, gestaltNames } from "./giga_garden_images.js";
import { colorlist, palettes, paletteNames } from "./giga_garden_colors.js";
import { genTokenData, extractRandSeed } from "../lib/hashUtils.js";

/**
 * To do 4/10 - 4/12
 
 // DONE add second blend filter to insets
 // DONE angle, scale, and mask insets
 // DONE monochrome color sets
 // DONE mirror images

 // DONE async loading of second diptych image
 // DONE diptych display
 // DONE limit diptych to vertical only
 // DONE diptych inset = single image

 // DONE optimize and base64 all 11 images
 // DONE remove weird line from fairyland image
 // DONE tweak feature chances
 // DONE add 1/1 caninical pattern variants

 // 2DO remove debug code
 // 2DO minify and package for uploading
 // 2DO features script
 */

/**
 * Piter Pasma's tiny R function
 * 
 * Usage:
    // value 0..1
    R()
    // range 0..17
    R(17)
    // range 2..23
    2+R(21)
    // integer 0..16 (excl.endpoint)
    R(16)|0
    // integer 2..7 (excl.endpoint)
    2+R(5)|0
    // pick
    list[R(list.length)|0]
    // pick list of known length
    list[R(7)|0]
 */

let s, t;
let S,
  R = () => {};

function seedRandom(hash) {
  (S = Uint32Array.from(
    [0, 0, 0, 0].map((i) => parseInt(hash.substr(i * 8 + 5, 8), 16))
  )),
    (R = (a = 1) =>
      a *
      ((t = S[3]),
      (S[3] = S[2]),
      (S[2] = S[1]),
      (s = S[1] = S[0]),
      (t ^= t << 11),
      (S[0] ^= t ^ (t >>> 8) ^ (s >>> 19)),
      S[0] / 2 ** 32));
}

function randInt(top = 1) {
  return Math.floor(R(top));
}
function randGauss(center = 0, top = 1) {
  return center + top * (R() - R());
  //return Math.round(a*(R()+R()+R())/3)
}
function randChoice(arr) {
  let idx = Math.floor(R(arr.length));
  //console.log("idx=" + idx);
  return arr[idx];
}

seedRandom(tokenData.hash);
// take one off the top
// console.log("R(17)=" + R(17));
// console.log("R(17)|0=" + randInt(17));
// console.log("randGauss=" + randGauss());
// console.log("randGauss(17)=" + randGauss(0, 17));

//const seed = parseInt(tokenData.hash.slice(0, 16), 16);
//let RNG = new Random();
let canvas;
let left_x, right_x, top_y, bottom_y, resolution, num_columns, num_rows, grid;
let spots = [];
let shapeAlphaCols = [];
let shapeCols = [];

const defaultW = 1000,
  defaultH = 1200,
  ratio = 0.8333333333333334,
  bitmapW = 864,
  bitmapH = 1038; // 720,864 // 864,1038 // 576, 592

// Feature support
let imgIndex1 = 0,
  imgIndex2 = -1,
  currentIndex = 0;
let useDither = true;
let doSharpen = false;
let useOrigSize = false;
let canonical = false;
let showLines = false;

const num_steps = 200;
let step_length = 2;
let inversion = true;

let blendIdx = 0;
let blender;
let blendNames = [
  "HARD_LIGHT",
  // "SOFT_LIGHT",
  // "OVERLAY",
  "inverted HARD_LIGHT",
  // "inverted SOFT_LIGHT",
  // "inverted OVERLAY",
  "DIFFERENCE",
  "colors only",
];
let imgDarkness = 40;
let sourceImg1, sourceImg2;
let sourceImages = [];
let numImagesNeeded = 1;
let numImagesLoaded = 0;
let nextImageData = "";
let specFactor = 20;

// --- P5 SKETCH ---
function skt(pf) {
  let blendTypes = [
    [0, pf.HARD_LIGHT],

    // [ 0, pf.SOFT_LIGHT],
    // [ 0, pf.OVERLAY],

    // [ 0, pf.BLEND],
    // [ 0, pf.MULTIPLY],
    // [ 0, pf.DARKEST],
    //[ 0, pf.BURN],
    [1, pf.HARD_LIGHT],
    // [ 1, pf.SOFT_LIGHT],
    // [ 1, pf.OVERLAY],
    // [ 1, pf.BLEND],
    // [ 1, pf.SCREEN],
    [1, pf.DIFFERENCE],
    [1, pf.DARKEST],
  ];
  blender = blendTypes[0];

  let angleOffset = 0,
    x1 = [],
    y1 = [],
    x2 = [],
    y2 = [];
  var shh, sww, canvasW, canvasH, scale, dim;
  var tokenId;
  var saveNum = 1;
  let bitmapImg;
  let bleaching = 1;
  let bleachNames = ["none", "minor", "major"];
  let overlayStyle = 0;
  let overlayNames = ["none", "inset"];
  let overlaySizePct = 0.6;
  let overlayLeftPct = 0.05;
  let overlayTopPct = 0.05;
  let overlayBlend;
  let overlayAngle = 0;
  let overlayAngleNames = ["match", "original"];

  let diptychStyle = 0;
  let diptychNames = ["single", "diptych", "quad"];
  let firstImageLeft = true;

  let colorScheme = 0;
  let colorSchemeNames = ["Random", "Monochrome"];
  let paletteIndex = 0;
  let doMirror = false;
  let mirrorVert = false;
  let mirrorFirst = true;

  let loadNewBitmap = true;
  // keep track of whether we need to invert this again if cycling through
  let prevInvert = 0;

  /**
   * Extracts parameters from the token hash and uses them to define the features of the sketch
   * @param {*} genNewHash Whether to generate a new hash (for testing)
   * @param {*} useNextIndex Whether to increment the color scheme index (for testing)
   */
  function newToken(
    genNewHash = false,
    useNextIndex = false,
    nextBlendType = false,
    sharpenCurrentImg = false
  ) {
    if (genNewHash || tokenData.hash == "") {
      tokenData = genTokenData(333);
      loadNewBitmap = true;
      numImagesNeeded = 1;
      numImagesLoaded = 0;
      useOrigSize = false;
    } else {
      if (sharpenCurrentImg) loadNewBitmap = true;
    }
    //seed = extractRandSeed(tokenData.hash);
    tokenId = parseInt(tokenData.tokenId) % 1000000;
    console.log("tokenData", tokenData);

    // seed the RNG and the noise function from the hash so they are determinative
    seedRandom(tokenData.hash);
    pf.noiseSeed(randInt(1000000));

    //imgIndex = 5;

    imgIndex2 = -1;
    let mirrorStr = "";
    doMirror = false;
    colorScheme = 0;
    let colorStr = "Random";
    canonical = false;

    if (tokenId % specFactor == 0 && tokenId < specFactor * 22) {
      imgIndex1 = Math.floor(tokenId / specFactor);
      if (imgIndex1 > 10) {
        imgIndex1 -= 11;
        angleOffset = 180;
      } else {
        useOrigSize = true;
      }
      diptychStyle = 0;
      overlayStyle = 0;
      canonical = true;
      console.log("XXXXXXXXXXXXXXXXXX");
    } else {
      imgIndex1 = randInt(imgList.length);
      angleOffset = randInt(360);
      diptychStyle = R() < 0.1 ? 1 : 0;
      if (diptychStyle > 0) {
        // choose second image
        numImagesNeeded++;
        imgIndex2 = imgIndex1;
        do {
          imgIndex2 = randInt(imgList.length);
        } while (imgIndex2 == imgIndex1);

        firstImageLeft = R() < 0.5;
        useOrigSize = true;
      }

      let randOver = R();
      overlayStyle = randOver < 0.15 ? 1 : 0;
      if (overlayStyle == 1) {
        // inset
        overlaySizePct = Math.round(4 + randInt(4)) / 10; // 0.4 - 0.7
        overlayLeftPct = 0.1 + R() * 0.5 * (0.8 - overlaySizePct);
        overlayTopPct = 0.1 + R() * 0.5 * (0.8 - overlaySizePct);
        let randBlend = R();
        overlayBlend =
          randBlend < 0.4
            ? pf.HARD_LIGHT
            : randBlend < 0.7
            ? pf.OVERLAY
            : pf.DARKEST;
        overlayAngle = R() < 0.5 ? 0 : 1;
        console.log(
          "inset=",
          true,
          overlaySizePct,
          overlayAngleNames[overlayAngle],
          overlayBlend
        );
      }

      let randMirror = R();
      randMirror = R(); // avoiding a weird correspondence betweem imgIndex1 and randMirror
      //console.log("index vs R:", imgIndex1, randMirror);
      // no mirroring for diptychs
      if (diptychStyle == 0) {
        //console.log("no diptych");
        if (randMirror < 0.3) {
          //console.log("mirror it:", randMirror);
          // image restrictions:
          // [2, 5, 9] => only horizontal
          // [0, 1, 4] => vertical bottom-to-top is ok
          // [ 3, 6, 7, 8, 10] => anything goes
          let horizOnly = [2, 5, 9];
          let secondOnly = [0, 1, 4];
          doMirror = true;

          if (horizOnly.indexOf(imgIndex1) > -1) {
            mirrorVert = false;
          } else {
            mirrorVert = R() < 0.5;
          }

          if (mirrorVert && secondOnly.indexOf(imgIndex1) > -1) {
            mirrorFirst = false;
          } else {
            mirrorFirst = R() < 0.5;
          }

          if (mirrorVert) {
            mirrorStr = mirrorFirst ? "Down" : "Up";
          } else {
            mirrorStr = mirrorFirst ? "Left to Right" : "Right to Left";
          }
        }
      }

      if (R() < 0.05) {
        colorScheme = 1;
        paletteIndex = randInt(palettes.length);
        colorStr = "Monochrome: " + paletteNames[paletteIndex];
      }
    }

    nextImageData = imgList[imgIndex1];

    let darkArray = [3, 7, 10];
    if (darkArray.indexOf(imgIndex1) >= 0) {
      imgDarkness = 120 + randInt(21);
    } else {
      imgDarkness = 100 + randInt(41);
    }

    console.log("image=", imgIndex1, gestaltNames[imgIndex1], imgDarkness);
    console.log(
      "diptych=",
      diptychStyle > 0,
      diptychStyle > 0 ? imgIndex2 + ", " + gestaltNames[imgIndex2] : ""
    );
    // console.log("sharpened=", doSharpen);
    console.log("angled=", !useOrigSize, angleOffset);
    console.log("mirrorImage=", doMirror, mirrorStr);
    console.log("color scheme=", colorStr);

    setSize();
    // console.log("scale=", scale);

    // set features
    let r1 = R();
    if (!nextBlendType) {
      //blendIdx = randInt(blendTypes.length);
      // avoid Difference for monochrome palettes
      blendIdx = r1 < 0.4 ? 1 : colorScheme == 1 || r1 < 0.9 ? 0 : 2;
      prevInvert = 0;
    } else {
      // next type
      blendIdx = (blendIdx + 1) % blendTypes.length;
    }
    blender = blendTypes[blendIdx];
    console.log("filter=", blendNames[blendIdx]);

    r1 = R();
    bleaching = r1 < 0.08 ? 0 : r1 < 0.85 ? 1 : 2;
    console.log("ribboning=", bleachNames[bleaching]);
  }

  function setSize() {
    (shh = window.innerHeight), (sww = shh * ratio);
    canvasW = sww;
    canvasH = shh;

    shh * ratio > sww
      ? ((canvasH = 1.2 * sww), (canvasW = sww))
      : ((canvasH = shh), (canvasW = shh * ratio));

    dim = Math.min(canvasH, canvasW);
    scale = dim / defaultW;
  }

  pf.preload = () => {
    //imgIndex = randInt(imgList.length);
    //srcImg = pf.loadImage(imgList[imgIndex]);
  };

  pf.setup = () => {
    pf.pixelDensity(2);
    newToken();

    pf.noStroke();
    canvas = pf.createCanvas(canvasW, canvasH);
    //pf.background(255);

    pf.noLoop();
  };

  pf.draw = () => {
    console.log("DRAW");
    pf.background(255);

    if (!loadNewBitmap) {
      //console.log("don't load new bitmap");
      paint(bitmapImg, diptychStyle == 0 ? sourceImg1 : sourceImages[0]); // use sourceImg1 for diptych image
    } else {
      // use a callback to display the image after loading

      pf.loadImage("data:image/png;base64," + nextImageData, (srcImg) => {
        // NOTE: Don't get random numbers in here -- we want to be able to reload without this code being called
        //console.log("srcImg w,h=" + srcImg.width, srcImg.height);

        // resize to fit the bitmap size
        srcImg.resize(bitmapW * 1, bitmapH * 1);
        sourceImages.push(srcImg);
        numImagesLoaded++;

        if (diptychStyle > 0) {
          if (numImagesLoaded <= numImagesNeeded) {
            //console.log("numImagesLoaded=", numImagesLoaded + "/" + numImagesNeeded);
            //console.log("get next image: " + imgIndex2);
            nextImageData = imgList[imgIndex2];
            pf.loop();
            loadNewBitmap = true;
            return;
          } else {
            // combine the images
            sourceImg1 = spliceImages(
              sourceImages[0],
              sourceImages[1],
              firstImageLeft
            );
            //pf.image(sourceImg1, 100, 100);
            //console.log("sourceImg1=" + sourceImg1.width, sourceImg1.height);
          }
        } else if (doMirror) {
          console.log("MIRRORING");
          sourceImg1 = mirrorImage(srcImg, mirrorVert, mirrorFirst);
        } else {
          sourceImg1 = srcImg;
        }
        loadNewBitmap = false;
        pf.noLoop();

        if (useDither) {
          bitmapImg = ditherImage(sourceImg1, "bayer", imgDarkness); // "floydsteinberg" imgDarkness
          //bitmapImg = ditherImage(tempImg, "none", 80);
        } else {
          //pf.image(edgeImg, 0, 0);
          //tileImage(grainImg, offscreen);
          let grainImg = getGrain(bitmapW, bitmapH);
          //pf.blendMode(pf.HARD_LIGHT);

          bitmapImg.blend(
            grainImg,
            0,
            0,
            bitmapW,
            bitmapH,
            0,
            0,
            bitmapW,
            bitmapH,
            pf.OVERLAY
          );
        }
        // write bitmap to canvas

        //console.log("z numImagesLoaded=", numImagesLoaded + "/" + numImagesNeeded);
        if (numImagesLoaded == numImagesNeeded) paint(bitmapImg, sourceImg1);
        //pf.noSmooth();
        //pf.image(bitmapImg, 0, 0, canvasW, canvasH);
        //pf.image(bitmapImg, 0, 0);
      });
    }
  };

  function paint(bmap, srcImg) {
    console.log("PAINT");
    // choose colors
    shapeAlphaCols = [];
    shapeCols = [];
    let col;
    if (colorScheme == 0) {
      // random colors
      let avgLight = 0;
      let totalLight = 0;

      for (var q = 0; q < 6; q++) {
        col = randChoice(colorlist); // alpha = 07
        totalLight += pf.lightness(pf.color(col));
        avgLight = totalLight / (q + 1);
        if (q == 2) {
          //console.log("avgLight=" + avgLight);
          if (avgLight < 35) {
            // pull a color from the light list (last 150)
            col = colorlist[colorlist.length - 150 + randInt(150)];
          } else if (avgLight > 65) {
            // pull a color from the dark list (first 150)
            col = colorlist[randInt(150)];
          }
        }
        shapeAlphaCols.push("#" + col + "07");
        shapeCols.push("#" + col);
      }
    } else {
      // palette colors
      // clone the color list
      let paletteColors = [...palettes[paletteIndex]];
      for (var i = 0; i < 6; i++) {
        // pull 6 random colors from the list
        let idx = randInt(paletteColors.length);
        shapeCols.push("#" + paletteColors[idx]);
        shapeAlphaCols.push("#" + paletteColors[idx] + "07");
        paletteColors.splice(idx, 1);
      }
    }

    console.log("colors:", shapeCols);

    // spot placement is on a grid of 1000 x 1200 that covers the whole image
    let dyeSpots = [
      [
        // four corners
        [500, 600, 400, 500],
        [200, 200, 200, 250],
        [800, 200, 200, 250],
        [200, 1000, 200, 250],
        [800, 1000, 200, 250],
      ],
      [
        // diagonal
        [400, 400, 1000, 1100],
        [250, 400, 250, 500],
        [440, 600, 220, 450],
        [650, 800, 150, 300],
        [950, 1000, 100, 200],
      ],
      [
        // diagonal2
        [500, 600, 800, 900],
        [220, 400, 150, 150],
        [440, 550, 150, 150],
        [680, 740, 150, 150],
        [950, 1000, 150, 150],
      ],
      [
        // Hills
        [500, 250, 700, 400],
        [500, 450, 700, 400],
        [500, 650, 700, 400],
        [500, 800, 700, 400],
        [500, 1080, 700, 400],
      ],
      [
        // growth
        [500, 500, 1000, 1000],
        [500, 800, 700, 500],
        [500, 950, 320, 300],
        [500, 1050, 160, 120],
        [500, 1100, 120, 80],
      ],
      [
        // Vertical
        [500, 600, 300, 900],
        [200, 600, 100, 800],
        [800, 600, 100, 800],
        [900, 700, 160, 600],
        [100, 700, 160, 600],
      ],
      [
        // slant
        [800, -200, 120, 200],
        [350, 200, 120, 200],
        [-100, 600, 120, 200],
        [250, 1400, 120, 200],
        [700, 1000, 120, 200],
        [1150, 600, 120, 200],
      ],
      [
        // Gap
        [1100, 700, 150, 350],
        [480, 300, 150, 350],
        [-100, 700, 150, 350],
      ],
      [
        // sandwich
        [836, 983, 478, 451],
        [445, 156, 350, 481],
        [257, 810, 468, 576],
        [778, -20, 184, 452],
        [987, 842, 448, 150],
      ],
      [
        // deluge
        [478, 66, 514, 412],
        [680, 220, 494, 473],
        [314, 1081, 563, 632],
        [412, 346, 303, 536],
        [123, 287, 490, 314],
      ],
      [
        // breaker
        [367, 820, 312, 249],
        [159, 927, 496, 556],
        [571, 871, 254, 239],
        [452, 68, 527, 429],
        [98, 1156, 321, 274],
      ],
      [
        // skywarp
        [220, 247, 444, 452],
        [310, 771, 370, 225],
        [907, 1191, 519, 358],
        [169, 362, 174, 329],
        [360, 1005, 437, 148],
      ],
      [
        // impending
        [368, 267, 221, 424],
        [504, 579, 507, 275],
        [184, 1017, 285, 391],
        [555, 894, 493, 592],
        [21, 982, 350, 260],
      ],
    ];

    let arrangementNames = [
      "Four corners",
      "Diagonal 1",
      "Diagonal 2",
      "Hills",
      "Growth",
      "Vertical",
      "Slanted",
      "Gap",
      "Sandwich",
      "Deluge",
      "Breaker",
      "Skywarp",
      "Impending",
      "RANDOM",
      "RANDOM",
    ];

    pf.push();
    spots = [];
    let gradRand = R();
    if (gradRand < 0.15) {
      fillMultiGradient(
        0,
        0,
        canvasW,
        canvasH,
        pf.color(shapeCols[0]),
        pf.color(shapeCols[1]),
        pf.color(shapeCols[2]),
        pf.color(shapeCols[3]),
        30
      );
      console.log("arrangement=", "Gradient 4-color");
    } else {
      let spotIdx = randInt(dyeSpots.length + 2);
      let flipHoriz = R() < 0.4;
      console.log(
        "arrangement=",
        spotIdx,
        arrangementNames[spotIdx],
        flipHoriz ? "flipped" : ""
      );

      if (spotIdx >= dyeSpots.length) {
        // RANDOM ARRANGEMENT

        for (var q = 0; q < 5; q++) {
          spots.push([
            randInt(defaultW),
            randInt(defaultH),
            100 + Math.floor(randGauss(300, 290)),
            100 + Math.floor(randGauss(300, 290)),
          ]);
        }
      } else {
        if (flipHoriz) {
          // flip coords horizontally
          spots = dyeSpots[spotIdx].map((s) => {
            return [1000 - s[0], s[1], s[2], s[3]];
          });
        } else {
          spots = dyeSpots[spotIdx];
        }
      }

      pf.ellipseMode(pf.RADIUS);

      let xMag, yMag, blotMag, ratio;

      for (var q = 0; q < spots.length; q++) {
        pf.fill(shapeAlphaCols[q]);
        let s = spots[q].map((k) => {
          return k * scale;
        });

        // paint a ton of circles around our ellipse

        xMag = s[2] * 0.2;
        yMag = s[3] * 0.2;
        blotMag = s[2] * 0.04;
        ratio = s[3] / s[2];

        if (showLines) {
          pf.stroke(0);
          pf.strokeWeight(1);
        } else {
          pf.noStroke();
        }

        for (let j = 0; j < 300; j += 1) {
          // let randDist = R(s[2]);
          // let randAngle = R(pf.TWO_PI);
          let randX = randGauss(s[0], xMag);
          let randY = randGauss(s[1], yMag);
          let blotSize =
            100 *
            Math.abs(
              randGauss(blotMag, blotMag * 0.9) -
                randGauss(blotMag, blotMag * 0.5)
            );
          //let blotSize = 10 * Math.abs(randGauss(blotMag, blotMag * 0.9));
          //pf.rotate(randGauss(0, 0.1));
          pf.ellipse(randX, randY, blotSize, blotSize * ratio);
          // if (j == 0)
          // {
          //     console.log("randX, randY =", randX, randY);
          //     console.log("blotMag, blotSize =", blotMag, blotSize);
          // }
        }
      }

      let mottling = R() < 0.9 ? true : false;
      console.log("mottling=", mottling);
      // second set of small circles
      if (mottling) {
        for (var q = 0; q < spots.length; q++) {
          pf.fill(shapeAlphaCols[q]);
          let s = spots[q].map((k) => {
            return k * scale;
          });

          if (showLines) {
            pf.stroke(200, 30, 200);
          }

          xMag = s[2] * 0.1;
          yMag = s[3] * 0.1;
          blotMag = s[3] * 0.003;
          ratio = s[3] / s[2];
          for (let j = 0; j < 1500; j += 1) {
            // let randDist = R(s[2]);
            // let randAngle = R(pf.TWO_PI);
            let randX = randGauss(s[0], s[0]);
            let randY = randGauss(s[1], s[1]);
            let blotSize =
              100 *
              Math.abs(
                randGauss(blotMag, blotMag * 0.7) -
                  randGauss(blotMag, blotMag * 0.2)
              );
            pf.ellipse(randX, randY, blotSize, blotSize * ratio);
          }

          // first set of small circles
          // xMag = s[2] * 1 + randGauss(2, 0.4);
          // yMag = s[3] * 1 + randGauss(2, 0.4);

          if (showLines) {
            pf.stroke(255, 200, 0);
          }
          //pf.strokeWeight(1);
          blotMag *= 0.6;
          // crazy random out-there small circles
          //console.log("spot #", q);
          for (let j = 0; j < 100; j++) {
            // around the perimeter
            let theta = R(pf.TWO_PI);
            xMag = Math.abs(randGauss(0, s[2] * 3.3) - randGauss(0, s[2]));
            yMag = Math.abs(randGauss(0, s[3] * 3.3) - randGauss(0, s[3]));
            // get a point on the perimeter
            let randX = s[0] + xMag * Math.cos(theta);
            let randY = s[1] + yMag * Math.sin(theta);
            let blotSize =
              100 *
              Math.abs(
                randGauss(blotMag, blotMag * 0.7) -
                  randGauss(blotMag, blotMag * 0.3)
              );
            pf.ellipse(randX, randY, blotSize, blotSize * ratio);
          }

          if (showLines) {
            pf.stroke(255);
          }
          blotMag *= 1.5;

          for (let j = 0; j < 1100; j++) {
            // around the perimeter
            let theta = R(pf.TWO_PI);
            xMag =
              s[2] * (0.0 + Math.abs(randGauss(0.9, 0.55) - randGauss(0.6, 1)));
            yMag =
              s[3] * (0.0 + Math.abs(randGauss(0.9, 0.55) - randGauss(0.6, 1)));
            // get a point on the perimeter
            let randX = s[0] + xMag * Math.cos(theta);
            let randY = s[1] + yMag * Math.sin(theta);
            let blotSize =
              100 *
              Math.abs(
                randGauss(blotMag, blotMag * 0.5) -
                  randGauss(blotMag, blotMag * 0.3)
              );

            if (showLines && q == spots.length) {
              pf.stroke(0, 192, 255);
            }
            pf.ellipse(randX, randY, blotSize, blotSize * ratio);
          }
        }
      }

      if (showLines) {
        for (var q1 = 0; q1 < spots.length; q1++) {
          pf.fill(shapeAlphaCols[q1]);
          let s = spots[q1].map((k) => {
            return k * scale;
          });
          // base ellipse coverage
          pf.stroke(0);
          pf.strokeWeight(2);
          pf.ellipse(...s);
        }
        pf.noStroke();
      }
    }

    pf.pop();

    //pf.filter(pf.BLUR, 3);

    // add white washes
    var angle;
    if (bleaching > 0) {
      right_x = defaultW / 2;
      left_x = -right_x;
      bottom_y = defaultH / 2;
      top_y = -bottom_y;

      resolution = 0.01 * defaultW;

      num_columns = (right_x - left_x) / resolution; // 2canvasW / 0.01canvasW = 200 always -- except when rounded
      num_rows = (bottom_y - top_y) / resolution;

      // grid = new Array(num_columns);

      // for (var n = 0; n < num_columns; n++)
      // {
      //     grid[n] = new Array(num_rows);
      // }

      grid = [];
      let gridRow = [];

      // create 200x200 flow field
      for (var f = 0; f < num_rows; f++) {
        gridRow = [];
        for (var z = 0; z < num_columns; z++) {
          let e = 0.01 * parseFloat(f);
          let P = 0.01 * parseFloat(z);
          let v = pf.noise(e, P);
          angle = pf.map(v, 0, 1, 0, pf.TWO_PI) + pf.radians(100);
          gridRow.push(angle);
        }
        grid.push(gridRow);
      }
      //console.log("grid=", grid);

      let numWashes = bleaching * 4 + randInt(2); //
      step_length = bleaching + 1; // 2 or 3
      let x1 = [];
      let y1 = [];
      let x2 = [];
      let y2 = [];
      for (let n = 0; n < numWashes; n++) {
        x1.push(randInt(defaultW / 2));
        y1.push(randInt(defaultH / 2));
        x2.push(defaultW / 2 + randInt(defaultW / 2));
        y2.push(defaultH / 2 + randInt(defaultH / 2));
      }

      //console.log("coords=", x1, y1, x2, y2);
      var r = pf.color(255, 255, 255);
      r.setAlpha(2);
      pf.fill(r);
      // pf.fill(255, 255, 255, 2);
      for (let n = 0; n < numWashes; n++) {
        drawRibbon(x1[n], y1[n], num_steps);
        drawRibbon(x2[n], y2[n], num_steps);
      }
    }

    // for (n = 0; n < 10; n++)
    // {
    //     myFlowField(x2[n], y2[n], num_steps);
    // }

    if (blender[0] != prevInvert) {
      // && true == inversion
      invertImage(bmap);
      prevInvert = blender[0];
    }

    pf.push();
    // let blends = [
    //     [ pf.HARD_LIGHT, pf.SOFT_LIGHT, pf.MULTIPLY, pf.OVERLAY, pf.BLEND ], // not inverted // pf.ADD,
    //     [ pf.HARD_LIGHT, pf.SOFT_LIGHT, pf.DIFFERENCE, pf.EXCLUSION, pf.SCREEN, pf.BLEND, pf.OVERLAY ] // inverted // pf.ADD,
    // ];
    // let mode = randChoice(blends[temp]);
    // console.log("mode, temp=", mode, temp);
    pf.blendMode(blender[1]);

    // change alpha -- should keep it pretty dark though
    pf.tint(255, 215 + randInt(40));

    //pf.noSmooth();
    if (false) {
      // stretch image to cover full area
      pf.image(bmap, 0, 0, canvasW, canvasH);
    } else {
      // CALCULATE SCALE AMOUNT NEEDED
      // cheating with some curve fitting
      let bmapScale = 1;
      if (useOrigSize) {
        angleOffset = 0;
      } else {
        let scaleAngle = angleOffset % 180;
        if (scaleAngle > 90) scaleAngle = 180 - scaleAngle;

        bmapScale =
          Math.ceil(
            100.741 + 2.279 * scaleAngle - 0.023 * scaleAngle * scaleAngle
          ) / 100;
      }

      //console.log("angle, scale=", angleOffset, scaleAngle, bmapScale);
      // }
      // else
      // {
      //     bmapScale = (R(0.3) + 1.52);
      // }
      //bmapScale = 1;
      pf.imageMode(pf.CENTER);

      // if (doMirror)
      // {
      //     let mi = pf.createGraphics(bmapScale * canvasW, bmapScale * canvasH);
      //     mi.imageMode(pf.CENTER);
      //     mi.translate(canvasW / 2, canvasH / 2);
      //     mi.rotate(pf.radians(angleOffset));
      //     mi.image(bmap, 0, 0, bmapScale * canvasW, bmapScale * canvasH);

      //     bmap = mirrorImage(mi);
      // }

      pf.translate(canvasW / 2, canvasH / 2);
      //if (!doMirror)
      pf.rotate(pf.radians(angleOffset));
      pf.image(bmap, 0, 0, bmapScale * canvasW, bmapScale * canvasH);

      if (overlayStyle == 1) {
        // inset
        //pf.pop();
        // create new overlay image
        let overW = Math.floor(canvasW * overlaySizePct);
        let overH = Math.floor(canvasH * overlaySizePct);
        let overImg = pf.createGraphics(overW, overH);

        overImg.imageMode(pf.CENTER);
        overImg.translate(overW / 2, overH / 2);
        overImg.rotate(
          pf.radians(overlayAngle == 0 ? angleOffset : -angleOffset)
        );
        //overImg.reset(); // suppposed to match tranformsin main canvas?

        //let newImg = pf.createImage(srcImg.width, srcImg.height);
        let newImg = srcImg.get();
        //overImg.image(srcImg, 0, 0, overW, overH);
        //overImg = ditherImage(srcImg, "bayer", imgDarkness);
        if (prevInvert == 0) {
          // main bitmap was not inverted
          invertImage(newImg);
        }

        overImg.image(newImg, 0, 0, bmapScale * overW, bmapScale * overH);
        pf.tint(255, 180);
        let blend =
          blender[0] == 0 && blender[1] == pf.HARD_LIGHT
            ? pf.HARD_LIGHT
            : pf.HARD_LIGHT;
        pf.blendMode(blend);

        let overCenterX = canvasW * overlayLeftPct + overW / 2;
        let overCenterY = canvasH * overlayTopPct + overH / 2;

        pf.translate(overCenterX - canvasW / 2, overCenterY - canvasH / 2);
        pf.rotate(pf.radians(-angleOffset));
        pf.image(overImg, 0, 0, overW, overH);
        //pf.push();
      }
      pf.pop();
      // pf.image(sourceImages[0], 0, 0);
      // pf.image(sourceImages[1], 100, 100);
      // pf.image(sourceImg1, 200, 200);
    }

    //pf.pop();

    // add frame
    // restore default drawing state
    // pf.pop();
    // pf.noStroke();
    // let frameColor = pf.color(191, 185, 185);
    // pf.fill(frameColor);
    // pf.rect(0, 0, 20*scale, canvasH);
    // pf.rect(0, 0, canvasW, 20*scale);
    // pf.rect(0, canvasH - 20*scale, canvasW, canvasH);
    // pf.rect(canvasW - 20*scale, 0, canvasW, canvasH);
  }

  function invertImage(bmap, alpha = -1) {
    bmap.loadPixels();
    for (let n = 0; n < bmap.height; n++) {
      for (let f = 0; f < bmap.width; f++) {
        const z = 4 * (n * bmap.width + f);
        let e = bmap.pixels[z + 0];
        let P = bmap.pixels[z + 1];
        let v = bmap.pixels[z + 2];
        bmap.pixels[z + 0] = 255 - e;
        bmap.pixels[z + 1] = 255 - P;
        bmap.pixels[z + 2] = 255 - v;
        // invert alpha
        //bmap.pixels[z + 3] = bmap.pixels[z + 3] < 128 ? 0 : 255;
        // let a = bmap.pixels[z + 3];
        if (alpha >= 0) {
          bmap.pixels[z + 3] = alpha;
        }
      }
    }
    inversion = false;
    bmap.updatePixels();
    //return bmap;
  }

  // --- GRADIENTS ---

  function fillGradient(x, y, w, h, c1, c2, axis) {
    pf.noFill();

    //if (axis === pf.Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = pf.map(i, y, y + h, 0, 1);
      let c = pf.lerpColor(c1, c2, inter);
      pf.stroke(c);
      pf.line(x, i, x + w, i);
    }
    // } else if (axis === pf.X_AXIS) {
    //   // Left to right gradient
    //   for (let i = x; i <= x + w; i++) {
    //     let inter = pf.map(i, x, x + w, 0, 1);
    //     let c = pf.lerpColor(c1, c2, inter);
    //     pf.stroke(c);
    //     pf.line(i, y, i, y + h);
    //   }
    // }
  }

  function fillMultiGradient(x, y, w, h, c1, c2, c3, c4, noiseAmt = 20) {
    //console.log("fillMultiGradient");
    pf.noFill();

    let leftColor = c1;
    let rightColor = c2;
    let xStep = 40 * scale;
    noiseAmt *= scale;

    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let interY = pf.map(i, y, y + h, 0, 1);
      leftColor = pf.lerpColor(c1, c3, interY);
      rightColor = pf.lerpColor(c2, c4, interY);

      let dist = 0;
      for (let j = x; j <= x + w; j += dist) {
        let interX = pf.map(j, x, x + w, 0, 1);
        let c = pf.lerpColor(leftColor, rightColor, interX);
        pf.stroke(c);
        // this uses the rand() function, but after all composition calculations have been done
        dist = xStep + R() * noiseAmt;
        let endX = Math.min(j + dist, x + w);
        pf.line(j, i, endX, i);
      }
    }
  }

  function radialGradient(x, y, w, h, c1, c2) {
    pf.noStroke();

    //let radius = 1;
    let max = Math.max(w, h) * 0.705;
    let colorMax = max * 1.2;

    // center to outer gradient
    for (let radius = max; radius > 1; radius--) {
      let inter = pf.map(radius, 1, colorMax, 0, 1);
      let c = pf.lerpColor(c1, c2, inter);
      pf.fill(c);
      pf.circle(x, y, radius * 2);
    }
  }

  // --- IMAGE PROCESSING ---
  function getGrain(w, h) {
    let offscreen = pf.createImage(w, h);
    offscreen.loadPixels();

    let white = pf.color(255, 48);
    let black = pf.color(0, 222);
    let col;
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        col = (Math.floor(x / 2) + Math.floor(y / 2)) % 2 == 0 ? white : black;
        //col = ((x + y) % 2 == 0) ? white : black;
        offscreen.set(x, y, col);
      }
    }
    offscreen.updatePixels();
    pf.noSmooth();
    offscreen.resize(w, h);
    return offscreen;
  }

  function tileImage(patternImg, destImg) {
    //blendMode(HARD_LIGHT);
    pf.push();
    console.log("w,h=" + patternImg.width, patternImg.height);
    pf.noSmooth();
    //blendMode(REPLACE);
    let mult = 2;
    for (var y = 0; y < destImg.height; y += patternImg.height * mult) {
      for (var x = 0; x < destImg.width; x += patternImg.width * mult) {
        destImg.copy(
          patternImg,
          0,
          0,
          patternImg.width,
          patternImg.height,
          x,
          y,
          patternImg.width * mult,
          patternImg.height * mult
        );
        //destImg.set(patternImg, x, y);
      }
    }
    pf.pop();
  }

  function spliceImages(img1, img2, firstLeft = false) {
    //console.log("spliceImages");
    let comboImg = img1.get();
    let halfW1 = Math.floor(img1.width / 2);
    let halfW2 = Math.floor(img2.width / 2);
    let sx = 0,
      dx = 0;
    if (firstLeft) {
      dx = halfW1;
      sx = halfW2;
    }
    comboImg.copy(img2, dx, 0, halfW1, img1.height, sx, 0, halfW2, img2.height);
    return comboImg;
  }

  function mirrorImage(img, vertical = false, firstHalf = false) {
    // copy pixels from one half of an image to the other, mirrored

    let outG = pf.createGraphics(img.width, img.height);

    if (vertical) {
      let halfH = Math.floor(img.height / 2);

      if (firstHalf) {
        // mirror the top half
        outG.image(img, 0, 0, img.width, halfH, 0, 0, img.width, halfH);
        outG.scale(1, -1);
        outG.image(
          img,
          0,
          -img.height,
          img.width,
          halfH,
          0,
          0,
          img.width,
          halfH
        );
      } else {
        // or mirror the bottom half
        outG.image(img, 0, halfH, img.width, halfH, 0, halfH, img.width, halfH);
        outG.scale(1, -1);
        outG.image(
          img,
          0,
          -halfH,
          img.width,
          halfH,
          0,
          halfH,
          img.width,
          halfH
        );
      }
    } else {
      let halfW = Math.floor(img.width / 2);
      if (firstHalf) {
        // mirror the left half
        outG.image(img, 0, 0, halfW, img.height, 0, 0, halfW, img.height);
        outG.scale(-1, 1);
        outG.image(
          img,
          -img.width,
          0,
          halfW,
          img.height,
          0,
          0,
          halfW,
          img.height
        );
      } else {
        // mirror the right half
        outG.image(
          img,
          halfW,
          0,
          halfW,
          img.height,
          halfW,
          0,
          halfW,
          img.height
        );
        outG.scale(-1, 1);
        outG.image(
          img,
          -halfW,
          0,
          halfW,
          img.height,
          halfW,
          0,
          halfW,
          img.height
        );
      }
    }
    return outG;
  }

  function ditherImage(img, type, threshold) {
    // source adapted from: https://github.com/meemoo/meemooapp/blob/44236a29574812026407c0288ab15390e88b556a/src/nodes/image-monochrome-worker.js

    if (threshold === undefined) threshold = 128;

    let out = img.get();
    let w = out.width;
    let newPixel, err;

    let bayerThresholdMap = [
      [15, 135, 45, 165],
      [195, 75, 225, 105],
      [60, 180, 30, 150],
      [240, 120, 210, 90],
    ];

    let lumR = [];
    let lumG = [];
    let lumB = [];

    out.loadPixels();

    for (let i = 0; i < 256; i++) {
      lumR[i] = i * 0.299;
      lumG[i] = i * 0.587;
      lumB[i] = i * 0.114;
    }

    for (let i = 0; i <= out.pixels.length; i += 4) {
      out.pixels[i] = Math.floor(
        lumR[out.pixels[i]] + lumG[out.pixels[i + 1]] + lumB[out.pixels[i + 2]]
      );
    }

    for (let i = 0; i <= out.pixels.length; i += 4) {
      if (type === "none") {
        // No dithering
        out.pixels[i] = out.pixels[i] < threshold ? 0 : 255;
      } else if (type === "bayer") {
        // 4x4 Bayer ordered dithering algorithm
        let x = (i / 4) % w;
        let y = Math.floor(i / 4 / w);
        let map = Math.floor(
          (out.pixels[i] + bayerThresholdMap[x % 4][y % 4]) / 2
        );
        out.pixels[i] = map < threshold ? 0 : 255;
      } else if (type === "floydsteinberg") {
        // Floyd–Steinberg dithering algorithm
        newPixel = out.pixels[i] < 129 ? 0 : 255;
        err = Math.floor((out.pixels[i] - newPixel) / 16);
        out.pixels[i] = newPixel;
        out.pixels[i + 4] += err * 7;
        out.pixels[i + 4 * w - 4] += err * 3;
        out.pixels[i + 4 * w] += err * 5;
        out.pixels[i + 4 * w + 4] += err * 1;
      } else {
        // Bill Atkinson's dithering algorithm
        newPixel = out.pixels[i] < 129 ? 0 : 255;
        err = Math.floor((out.pixels[i] - newPixel) / 8);
        out.pixels[i] = newPixel;

        out.pixels[i + 4] += err;
        out.pixels[i + 8] += err;
        out.pixels[i + 4 * w - 4] += err;
        out.pixels[i + 4 * w] += err;
        out.pixels[i + 4 * w + 4] += err;
        out.pixels[i + 8 * w] += err;
      }

      // Set g and b pixels equal to r
      out.pixels[i + 1] = out.pixels[i + 2] = out.pixels[i];
      // Set whites to transparent
      out.pixels[i + 3] = out.pixels[i] > threshold ? 0 : 255;
    }
    out.updatePixels();
    return out;
  }

  // to consider all neighboring pixels we use a 3x3 array
  // and normalize these values
  // kernel is the 3x3 matrix of normalized values
  const kernel = [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1],
  ];

  function sharpenImage(img) {
    console.log("sharpening...");
    // create a new image, same dimensions as img
    bitmapImg = pf.createImage(img.width, img.height);

    // load its pixels
    bitmapImg.loadPixels();

    // two for() loops, to iterate in x axis and y axis
    // since the kernel assumes that the pixel
    // has pixels above, under, left, and right
    // we need to skip the first and last column and row
    // x then goes from 1 to width - 1
    // y then goes from 1 to height - 1

    for (let x = 1; x < img.width - 1; x++) {
      for (let y = 1; y < img.height - 1; y++) {
        // kernel sum for the current pixel starts as 0
        let sum = 0;

        // kx, ky variables for iterating over the kernel
        // kx, ky have three different values: -1, 0, 1
        for (let kx = -1; kx <= 1; kx++) {
          for (let ky = -1; ky <= 1; ky++) {
            let xpos = x + kx;
            let ypos = y + ky;
            let pos = (y + ky) * img.width + (x + kx);
            // since our image is grayscale,
            // RGB values are identical
            // we retrieve the red value for this example
            let val = pf.red(img.get(xpos, ypos));
            // accumulate the  kernel sum
            // kernel is a 3x3 matrix
            // kx and ky have values -1, 0, 1
            // if we add 1 to kx and ky, we get 0, 1, 2
            // with that we can use it to iterate over kernel
            // and calculate the accumulated sum
            sum += kernel[ky + 1][kx + 1] * val;
          }
        }

        // set the pixel value of the edgeImg
        bitmapImg.set(x, y, pf.color(sum, sum, sum, Math.min(285 - sum, 255)));
      }
    }

    console.log("updating...");
    // updatePixels() to write the changes on edgeImg
    bitmapImg.updatePixels();
  }

  // --- SHAPE DRAWING ---

  function drawRibbon(x, y, numSteps) {
    let stepVal = step_length * scale;
    for (var e = 0; e < numSteps; e++) {
      // find the row/col for the point
      var P = x - left_x;
      var v = y - top_y;
      var colNum = Math.round(P / resolution);
      var rowNum = Math.round(v / resolution);

      colNum >= num_columns && (colNum = num_columns - 1);
      rowNum >= num_rows && (rowNum = num_rows - 1);

      var u = grid[rowNum][colNum];
      var f0 = Math.abs(step_length * pf.cos(u));
      var f1 = Math.abs(step_length * pf.sin(u));

      pf.ellipse(x * scale, y * scale, 30 * f0 * scale, 30 * f1 * scale);
      x += f0;
      y += f1;
    }
  }

  // --- INTERACTION ---

  pf.windowResized = () => {
    newToken(false, false);
    pf.resizeCanvas(canvasW, canvasH);
    // after this draw() will kick in again to redraw at the new size
  };

  pf.keyReleased = () => {
    if (pf.key === "s" || pf.key === "S") {
      pf.save(canvas, "giga_garden_" + tokenId + "_" + saveNum++ + ".png");
    } else if (pf.key === "n" || pf.key === "N") {
      // generate a new token
      //keepColors = false;
      newToken(true, false);
      pf.redraw();
    } else if (pf.key === "m" || pf.key === "M") {
      // generate a new token
      // newToken(false, false);
      // pf.redraw();
    } else if (pf.key === "b" || pf.key === "B") {
      // try the next blend type
      //keepColors = false;
      newToken(false, false, true);
      pf.redraw();
    } else if (pf.key === "x" || pf.key === "X") {
      // try the next blend type
      useOrigSize = !useOrigSize;
      newToken(false, false);
      pf.redraw();
    } else if (pf.key === "z" || pf.key === "Z") {
      doSharpen = !doSharpen;
      newToken(false, false, false, true);
      pf.redraw();
    } else if (pf.key === "l" || pf.key === "L") {
      // try the next blend type
      showLines = !showLines;
      newToken(false, false);
      pf.redraw();
    } else if (pf.key === "f" || pf.key === "f") {
      console.log("colors:", shapeCols);
      console.log("spots:", spots);
    } else if (pf.key === "q" || pf.key === "Q") {
      console.log("all colors:");
      exportRgb();
    }
  };

  // DEBUGGING
  function printColors(showHsl = false) {
    //console.log(getKeyByValue(colorSchemes, colorScheme) + " [" + colorlist.length + "]");
    let colStr = "[";

    if (showHsl) {
      let hex, hsl;
      for (var i = 0; i < colorlist.length; i++) {
        hex = colorList[i].toString("#rrggbb");
        hsl = hsluv.hexToHsluv(hex);
        colStr += JSON.stringify(hsl) + ",";
      }
    } else {
      for (var i = 0; i < colorList.length; i++) {
        colStr += "'" + colorList[i].toString("#rrggbb") + "',";
      }
    }

    console.log(colStr + "], //");
  }

  function exportRgb() {
    //console.log(getKeyByValue(colorSchemes, colorScheme) + " [" + colorlist.length + "]");
    let colStrings = [];

    for (var i = 0; i < colorlist.length; i++) {
      colStrings.push(pf.color(colorlist[i]).toString("#rrggbb"));
    }

    console.log(colStrings);
  }
}
let myp5 = new p5(skt, "sktch");
