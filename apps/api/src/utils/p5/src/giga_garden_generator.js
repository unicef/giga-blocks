import { gestaltNames } from "./giga_garden_images.js";
import {
  colorlist,
  palettes,
  paletteNames,
  colorfulPalettes,
  colorfulNames,
  dyeSpots,
  arrangementNames,
} from "./giga_garden_colors.js";

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
  // fake gaussian distribution
  return center + top * (R() - R());
}
function randChoice(arr) {
  let idx = Math.floor(R(arr.length));
  return arr[idx];
}

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
let useOrigSize = false;
let canonical = false;
let showLines = false;

const imgPaths = ["images/PNGS_A-C/Asian Spruce 2.png"];
const imgNames = ["images/PNGS_A-C/Asian Spruce 2.png"];

const num_steps = 200;
let step_length = 2;

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
//let seriesSize = 400;
let specFactor1 = 11;
let specFactor2 = 23;
//console.log("specFactor1=", specFactor1);
let firstSpecId = 6;

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
  var canvasW, canvasH, scale, dim;
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
  let overlayMatch = true;
  let diptychOverlayAngle = 0;
  let overlayAngleNames = ["winning", "devil's advocate"];

  let diptychStyle = 0;
  let diptychNames = ["singular", "totems", "quad"];
  let firstImageLeft = true;

  let colorScheme = 0;
  let colorSchemeNames = ["random", "monochrome", "colofrul"];
  let paletteIndex = 0;
  let mottleColors = false;
  let doMirror = false;
  let mirrorVert = false;
  let mirrorFirst = true;

  let loadNewBitmap = true;
  let resizeOnly = false;

  let showLarge = false;

  let arrangeIdx = 0;
  let arrangeFlipped = false;
  let quadRows = 0;
  let spec = false;

  // replace with strings in the features script
  const HARD_LIGHT = pf.HARD_LIGHT; // "hard_light";
  const OVERLAY = pf.OVERLAY; // "overlay";
  const DARKEST = pf.DARKEST; // "darken";

  /**
   * Extracts parameters from the token hash and uses them to define the features of the sketch
   * @param {*} genNewHash Whether to generate a new hash (for testing)
   */
  function newToken(
    genNewHash = false,
    doResize = false,
    reloadImages = false,
    newHeight = 0
  ) {
    if (genNewHash || tokenData.hash == "" || reloadImages) {
      if (!reloadImages) tokenData = genTokenData(333);

      loadNewBitmap = true;
      numImagesNeeded = 1;
      numImagesLoaded = 0;
      useOrigSize = false;
      resizeOnly = false;
    }

    console.log("resizeOnly=", resizeOnly);
    // reset vars

    imgIndex2 = -1;
    //let mirrorStr = "";
    doMirror = false;
    colorScheme = 0;
    let colorStr = "Random";
    canonical = false;
    let invertChance = 0.2;
    diptychStyle = 0;
    spec = false;

    // parse token data
    tokenId = parseInt(tokenData.tokenId) % 1000000;

    // if (tokenId % specFactor2 == firstSpecId && tokenId < specFactor2 * testCases.length)
    // {
    //     // from test list: 0, 64, 128, 192, 256, etc.
    //     let idx = Math.floor(tokenId / specFactor2) % testCases.length;
    //     tokenData.hash = testCases[idx];
    //     canonical = true;
    //     console.log("canon idx=", idx, canonical);
    // }

    // seed the RNG and the noise function from the hash so they are determinative
    seedRandom(tokenData.hash);
    pf.noiseSeed(randInt(1000000));

    // pull out some randoms
    // this R() function is somehow off -- #1, 3 and 6 always match
    // pulling out the first batch so we don't get weird correspondences anymore
    //let rs = [];
    for (var i = 0; i < 11; i++) {
      R();
      //rs.push(R());
    }

    imgIndex1 = randInt(imgPaths.length);
    angleOffset = randInt(360);
    console.log("angleOffset=", angleOffset);

    let randDip = R();
    if (randDip < 0.16) {
      diptychStyle = 1;
      // choose second image
      numImagesNeeded++;
      imgIndex2 = imgIndex1;

      // removed for testing single images
      // do {
      //   imgIndex2 = randInt(imgList.length);
      //   // imgIndex2 = randInt(imgPathsChristiesBw.length);
      // } while (imgIndex2 == imgIndex1);
      // console.log("imgIndex2=", imgIndex2);

      firstImageLeft = R() < 0.5;
      useOrigSize = true;
    } else if (randDip < 0.31) {
      diptychStyle = 2;

      let quadRowOptions = [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 8, 8, 16,
      ];
      quadRows = randChoice(quadRowOptions);

      angleOffset = R() < 0.5 ? 0 : 180;
    }

    let randOver = R();
    overlayStyle = randOver < 0.7 ? 1 : 0; //  + overlayAdjust
    if (overlayStyle == 1) {
      // inset
      let place = getInsetLocation();
      overlaySizePct = place.sizePct;
      overlayLeftPct = place.leftPct;
      overlayTopPct = place.topPct;

      let randBlend = R();
      //console.log("randBlend=", randBlend);
      overlayBlend =
        randBlend < 0.12 ? OVERLAY : randBlend < 0.27 ? DARKEST : HARD_LIGHT;
      overlayMatch = R() < 0.5;
      diptychOverlayAngle = diptychStyle == 1 && R() < 0.5 ? 180 : 0;
      console.log(
        "inset=",
        true,
        overlaySizePct,
        overlayMatch ? "winning" : "devil's advocate"
      );
    }

    let randMirror = R();
    // no mirroring for diptychs
    if (diptychStyle == 0) {
      //console.log("no diptych");
      if (randMirror < 0.3) {
        doMirror = true;
        mirrorVert = R() < 0.5;
        mirrorFirst = R() < 0.5;
      }
    }

    let randScheme = R();
    if (randScheme < 0.04) {
      colorScheme = 1;
      paletteIndex = randInt(palettes.length);
      colorStr =
        "Monochrome: " + paletteIndex + ", " + paletteNames[paletteIndex];
    } else if (randScheme < 0.1) {
      colorScheme = 2;
    }

    if (colorScheme == 2) {
      paletteIndex = randInt(colorfulPalettes.length);
      colorStr =
        "Colorful: " + paletteIndex + ", " + colorfulNames[paletteIndex];
    }

    nextImageData = imgPaths[imgIndex1];

    let r2 = R();
    //console.log("invertChance=", invertChance, imgIndex1, canonical);
    blendIdx = r2 < invertChance ? 1 : colorScheme == 1 || r2 < 0.9 ? 0 : 2; // || diptychStyle == 1
    blender = blendTypes[blendIdx];
    // adjust overlay blend if needed
    if (blendIdx == 0 && overlayBlend == DARKEST) {
      overlayBlend = OVERLAY;
    } else if (blendIdx == 1 && overlayBlend == OVERLAY) {
      overlayBlend = DARKEST;
    }

    let randDark = 5 - randInt(10);
    imgDarkness = 144; // default for hard_light
    if (diptychStyle == 2) {
      imgDarkness = 122; // 125
    } else {
      imgDarkness = blendIdx == 2 ? 125 : blendIdx == 1 ? 116 : 138;
    }
    imgDarkness += randDark;

    // console.log("image=", imgIndex1, gestaltNames[imgIndex1], imgDarkness);
    console.log(
      "diptych=",
      diptychStyle == 1,
      diptychStyle == 1 ? imgIndex2 + ", " + gestaltNames[imgIndex2] : ""
    );
    console.log("quad=", diptychStyle == 2);
    console.log("angled=", !useOrigSize, angleOffset);
    console.log("filter=", blendNames[blendIdx]);
    console.log("inset blend=", overlayBlend);

    let r1 = R();
    bleaching = r1 < 0.08 ? 0 : r1 < 0.85 ? 1 : 2;
    console.log("ribboning=", bleachNames[bleaching]);

    //R(); // burn one
    chooseColors();
    arrangeColors();

    mottleColors = R() < 0.9 ? true : false;
    console.log("mottling=", mottleColors);

    if (newHeight == 0) {
      newHeight = window.innerHeight;
    }

    setSize(newHeight, doResize);
  }

  function setSize(shh, doResize = false) {
    let sww = Math.round(shh * ratio);
    canvasW = sww;
    canvasH = shh;

    scale = canvasW / defaultW;

    if (doResize) pf.resizeCanvas(canvasW, canvasH);
  }

  function getInsetLocation() {
    let place = {};
    place.sizePct = Math.round(4 + randInt(4)) / 10; // 0.4 - 0.7
    place.leftPct = 0.1 + R() * 0.5 * (0.8 - place.sizePct);
    place.topPct = 0.1 + R() * 0.5 * (0.8 - place.sizePct);
    return place;
  }

  function chooseColors() {
    // choose colors
    shapeAlphaCols = [];
    shapeCols = [];
    let col;
    let colIdx = 0;
    if (colorScheme == 0) {
      // random colors
      for (var q = 0; q < 6; q++) {
        if (blendIdx == 1) {
          // pull a color from the darker list (first 200)
          colIdx = randInt(220);
        } else if (q == 1) {
          // pull a color from the dark list (first 150)
          colIdx = randInt(150);
        } else if (q == 2) {
          // pull a color from the light list (last 150)
          colIdx = colorlist.length - 150 + randInt(150);
        } else {
          colIdx = randInt(colorlist.length);
        }
        col = colorlist[colIdx];
        shapeAlphaCols.push("#" + col + "07");
        shapeCols.push("#" + col);
      }
    } else {
      // palette colors
      // clone the color list
      let paletteColors =
        colorScheme == 2
          ? [...colorfulPalettes[paletteIndex]]
          : [...palettes[paletteIndex]];
      for (var i = 0; i < 6; i++) {
        // pull 6 random colors from the list
        let idx = randInt(paletteColors.length);
        shapeCols.push("#" + paletteColors[idx]);
        shapeAlphaCols.push("#" + paletteColors[idx] + "07");
        paletteColors.splice(idx, 1);
      }
    }

    console.log("colors:", shapeCols);
  }

  // select a set of ellipses to use for color placement
  function arrangeColors() {
    spots = [];
    let gradRand = R();
    if (gradRand < 0.15) {
      arrangeIdx = dyeSpots.length + 2;
    } else {
      arrangeIdx = randInt(dyeSpots.length + 2);

      if (canonical && arrangeIdx >= dyeSpots.length) arrangeIdx = 13; // don't do random arrangements for canonical ones

      arrangeFlipped = R() < 0.4;

      if (arrangeIdx >= dyeSpots.length) {
        // RANDOM ARRANGEMENT

        for (var q = 0; q < 6; q++) {
          spots.push([
            randInt(defaultW),
            randInt(defaultH),
            100 + Math.floor(randGauss(280, 270)),
            100 + Math.floor(randGauss(280, 270)),
          ]);
        }
      } else {
        if (arrangeFlipped) {
          // flip coords horizontally
          spots = dyeSpots[arrangeIdx].map((s) => {
            return [1000 - s[0], s[1], s[2], s[3]];
          });
        } else {
          spots = dyeSpots[arrangeIdx];
        }
      }
    }
    console.log(
      "arrangement=",
      arrangeIdx,
      arrangementNames[arrangeIdx],
      arrangeFlipped ? "flipped" : ""
    );
  }

  // pf.preload = () =>
  // {
  //     //imgIndex = randInt(imgList.length);
  //     //srcImg = pf.loadImage(imgList[imgIndex]);
  // }

  pf.setup = () => {
    pf.pixelDensity(2);
    newToken(false, false);

    pf.noStroke();
    canvas = pf.createCanvas(canvasW, canvasH);
    //pf.background(255);

    pf.noLoop();
  };

  pf.draw = () => {
    if (loadNewBitmap) {
      // use a callback to display the image after loading
      // pf.loadImage("data:image/png;base64," + nextImageData, (srcImg) => {
      pf.loadImage(nextImageData, (srcImg) => {
        // NOTE: Don't get random numbers in here -- we want to be able to reload without this code being called
        //console.log("srcImg w,h=" + srcImg.width, srcImg.height);

        // resize to fit the bitmap size
        srcImg.resize(bitmapW * 1, bitmapH * 1);

        // no longer any need to save sourceImages[1]. we don't use it after this pass anymore
        if (numImagesLoaded == 0) sourceImages.push(srcImg);

        numImagesLoaded++;

        if (diptychStyle == 1) {
          if (numImagesLoaded < numImagesNeeded) {
            console.log(
              "numImagesLoaded=",
              numImagesLoaded + "/" + numImagesNeeded
            );
            // nextImageData = imgPathsChristiesBw[imgIndex2];
            nextImageData = imgPaths[imgIndex2];
            loadNewBitmap = true;
            // trigger one more draw() call
            pf.loop();
            return;
          } else {
            // combine the images
            sourceImg1 = spliceImages(sourceImages[0], srcImg, firstImageLeft);
          }
        } else if (doMirror) {
          //console.log("MIRRORING");
          sourceImg1 = mirrorImage(srcImg, mirrorVert, mirrorFirst);
        } else {
          sourceImg1 = srcImg;
        }
        pf.noLoop();

        bitmapImg = ditherImage(sourceImg1, imgDarkness);
        if (blender[0] == 1) {
          invertImage(bitmapImg);
        }

        // debug
        //console.log(window.performance.memory);

        //console.log("z numImagesLoaded=", numImagesLoaded + "/" + numImagesNeeded);
        if (numImagesLoaded == numImagesNeeded) {
          pf.noLoop();
          loadNewBitmap = false;
          paint(bitmapImg); // , sourceImages[0]
        }
      });
    } else if (resizeOnly) {
      //console.log("don't load new bitmap");
      paint(bitmapImg); // use sourceImg1 for diptych image , (diptychStyle == 0 ? sourceImg1 : sourceImages[0])
      resizeOnly = false;
    }
  };

  function paint(bmap) {
    // , srcImg
    //console.log("bmap w,h=" + bmap.width, bmap.height);
    pf.push();

    if (arrangeIdx == dyeSpots.length + 2) {
      console.log("GRADIENT");
      fillMultiGradient(
        0,
        0,
        canvasW,
        canvasH,
        pf.color(shapeCols[0]),
        pf.color(shapeCols[1]),
        pf.color(shapeCols[2]),
        pf.color(shapeCols[3])
      );
    } else {
      pf.ellipseMode(pf.RADIUS);

      let xMag, yMag, blotMag, ratio;

      for (var q = 0; q < spots.length; q++) {
        pf.fill(shapeAlphaCols[q]);
        let s = spots[q].map((k) => {
          return k * scale;
        });

        // paint a ton of circles around an ellipse
        xMag = s[2] * 0.2;
        yMag = s[3] * 0.2;
        blotMag = s[2] * 0.04;
        ratio = s[3] / s[2];

        // showLines = true;

        if (showLines) {
          pf.stroke(0);
          pf.strokeWeight(1);
        } else {
          pf.noStroke();
        }

        for (let j = 0; j < 300; j += 1) {
          let randX = randGauss(s[0], xMag);
          let randY = randGauss(s[1], yMag);
          let blotSize =
            100 *
            Math.abs(
              randGauss(blotMag, blotMag * 0.9) -
                randGauss(blotMag, blotMag * 0.5)
            );
          pf.ellipse(randX, randY, blotSize, blotSize * ratio);
        }
      }

      // second set of small circles for an impressionistic effect
      if (mottleColors) {
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

          //if (showLines) { pf.stroke(255,200,0); }

          blotMag *= 0.6;
          // crazy random out-there small circles
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

          //if (showLines) { pf.stroke(255); }
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

      // debug
      // if (showLines)
      // {

      //     for (var q1 = 0; q1 < spots.length; q1++)
      //     {
      //         pf.fill(shapeAlphaCols[q1]);
      //         let s = spots[q1].map(k => { return k * scale; });
      //         // base ellipse coverage
      //         pf.stroke(0);
      //         pf.strokeWeight(2);
      //         pf.ellipse(...s);
      //     }
      //     pf.noStroke();
      // }
    }
    pf.pop();

    // add white washes
    var angle;
    if (bleaching > 0) {
      right_x = defaultW / 2;
      left_x = -right_x;
      bottom_y = defaultH / 2;
      top_y = -bottom_y;

      resolution = 0.01 * defaultW;

      num_columns = (right_x - left_x) / resolution; // 2canvasW / 0.01canvasW = 200 always (??)
      num_rows = (bottom_y - top_y) / resolution;

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

      var r = pf.color(255, 255, 255);
      r.setAlpha(2);
      pf.fill(r);

      for (let n = 0; n < numWashes; n++) {
        drawRibbon(x1[n], y1[n], num_steps);
        drawRibbon(x2[n], y2[n], num_steps);
      }
    }

    pf.push();

    pf.blendMode(blender[1]);

    // change alpha -- should keep it pretty dark though

    let bmapScale = 1;
    let tintVal = 240;

    if (!resizeOnly && diptychStyle == 2) {
      let invertAlpha = -1;
      if (blender[0] == 1) {
        invertAlpha = 190;
      } else if (blender[0] == 0) {
        tintVal = 204;
      }
      invertImage(bmap, invertAlpha, quadRows);
    }

    pf.tint(255, tintVal);

    if (useOrigSize) {
      angleOffset = 0;
    } else {
      let scaleAngle = angleOffset % 180;
      if (scaleAngle > 90) scaleAngle = 180 - scaleAngle;

      // approximates the minimum magnification for the rotated image to cover the entire canvas
      bmapScale =
        Math.ceil(
          100.741 + 2.279 * scaleAngle - 0.023 * scaleAngle * scaleAngle
        ) / 100;
    }

    pf.imageMode(pf.CENTER);
    pf.translate(canvasW / 2, canvasH / 2);
    pf.rotate(pf.radians(angleOffset));

    pf.image(bmap, 0, 0, bmapScale * canvasW, bmapScale * canvasH);

    if (overlayStyle == 1) {
      // inset

      // create new overlay image
      let overW = Math.floor(canvasW * overlaySizePct);
      let overH = Math.floor(canvasH * overlaySizePct);
      let overImg = pf.createGraphics(overW, overH);

      overImg.imageMode(pf.CENTER);
      overImg.translate(overW / 2, overH / 2);

      let overAngle = overlayMatch ? angleOffset : -angleOffset;
      if (diptychStyle == 1) {
        overAngle = diptychOverlayAngle;
      }
      overImg.rotate(pf.radians(overAngle));

      let newImg = sourceImages[0].get();
      //overImg.image(srcImg, 0, 0, overW, overH);
      //overImg = ditherImage(srcImg, "bayer", imgDarkness);
      if (blendIdx == 0) {
        // main bitmap was not inverted
        invertImage(newImg);
      }

      overImg.image(newImg, 0, 0, bmapScale * overW, bmapScale * overH);
      // add transparency
      pf.tint(255, 180);
      // decded to reduce options to only HARD_LIGHT
      //let blend = (blender[0] == 0 && blender[1] == pf.HARD_LIGHT) ? pf.OVERLAY : pf.DARKEST;
      pf.blendMode(overlayBlend);

      let overCenterX = canvasW * overlayLeftPct + overW / 2;
      let overCenterY = canvasH * overlayTopPct + overH / 2;

      pf.translate(overCenterX - canvasW / 2, overCenterY - canvasH / 2);
      pf.rotate(pf.radians(-angleOffset));
      pf.image(overImg, 0, 0, overW, overH);
    }
    pf.pop();
  }

  // --- GRADIENTS ---

  function fillMultiGradient(x, y, w, h, c1, c2, c3, c4, noiseAmt = 30) {
    //console.log("fillMultiGradient");
    pf.noFill();

    let leftColor = c1;
    let rightColor = c2;
    let xStep = 10 * scale;
    noiseAmt *= scale;

    // pull a fixed set of randoms
    let rs = [];
    let rmax = 1379;
    for (let j = 0; j < rmax; j++) {
      rs.push(R() * noiseAmt);
    }
    //console.log(rs);

    // Top to bottom, left to right gradient
    let ridx = 0;
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
        dist = xStep + rs[ridx];
        //if (ridx < 50) console.log("dist=", dist);
        ridx++;
        if (ridx >= rmax) ridx = 0;

        let endX = Math.min(j + dist, x + w);
        pf.line(j, i, endX, i);
      }
    }
  }

  // --- IMAGE PROCESSING ---

  function invertImage(bmap, alpha = -1, quadCorners = -1, cutSpec = null) {
    bmap.loadPixels();

    let startX = 0;
    let startY = 0;
    let endX = bmap.width;
    let endY = bmap.height;

    if (cutSpec != null && cutSpec.sizePct > 0) {
      startX = Math.floor(cutSpec.leftPct * bmap.width);
      startY = Math.floor(cutSpec.topPct * bmap.height);

      endX = startX + Math.floor(cutSpec.sizePct * bmap.width);
      endY = startY + Math.floor(cutSpec.sizePct * bmap.height);
    }

    let colW = quadCorners < 2 ? bmap.width : bmap.width / quadCorners;
    let rowH = quadCorners < 2 ? bmap.height : bmap.height / quadCorners;
    let colNum = 0;
    let rowNum = 0;

    for (let n = startY; n < endY; n++) {
      rowNum = Math.floor(n / rowH) % 2;

      for (let f = startX; f < endX; f++) {
        colNum = Math.floor(f / colW) % 2;

        if (quadCorners < 2 || rowNum == colNum) {
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
    }
    bmap.updatePixels();
  }

  // reverse an images pixels from black to white and vice versa
  // function invertImage(bmap, alpha = -1, quadCorners = -1)
  // {
  //     bmap.loadPixels();
  //     let halfW = bmap.width / 2;
  //     let halfH = bmap.height / 2;

  //     for (let n = 0; n < bmap.height; n++)
  //     {
  //         for (let f = 0; f < bmap.width; f++)
  //         {

  //             if (quadCorners < 2 ||
  //                 ((n < halfH && f < halfW) || (n >= halfH && f >= halfW))
  //                )
  //             {
  //                 const z = 4 * (n * bmap.width + f);
  //                 let e = bmap.pixels[z + 0];
  //                 let P = bmap.pixels[z + 1];
  //                 let v = bmap.pixels[z + 2];
  //                 bmap.pixels[z + 0] = 255 - e;
  //                 bmap.pixels[z + 1] = 255 - P;
  //                 bmap.pixels[z + 2] = 255 - v;
  //                 // invert alpha
  //                 //bmap.pixels[z + 3] = bmap.pixels[z + 3] < 128 ? 0 : 255;
  //                 // let a = bmap.pixels[z + 3];
  //                 if (alpha >= 0)
  //                 {
  //                     bmap.pixels[z + 3] = alpha;
  //                 }
  //             }
  //         }
  //     }
  //     bmap.updatePixels();
  // }

  function spliceImages(img1, img2, firstLeft = false) {
    // combine two imges, half on the left, half on the right
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

  function ditherImage(img, threshold) {
    // type = "bayer"
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
      // if (type === "none")
      // {
      //     // No dithering
      //     out.pixels[i] = out.pixels[i] < threshold ? 0 : 255;
      // }
      // else if (type === "bayer")
      // {
      // 4x4 Bayer ordered dithering algorithm
      let x = (i / 4) % w;
      let y = Math.floor(i / 4 / w);
      let map = Math.floor(
        (out.pixels[i] + bayerThresholdMap[x % 4][y % 4]) / 2
      );
      out.pixels[i] = map < threshold ? 0 : 255;
      //}
      // else if (type === "floydsteinberg")
      // {
      //     // Floyd–Steinberg dithering algorithm
      //     newPixel = out.pixels[i] < 129 ? 0 : 255;
      //     err = Math.floor((out.pixels[i] - newPixel) / 16);
      //     out.pixels[i] = newPixel;
      //     out.pixels[i + 4] += err * 7;
      //     out.pixels[i + 4 * w - 4] += err * 3;
      //     out.pixels[i + 4 * w] += err * 5;
      //     out.pixels[i + 4 * w + 4] += err * 1;
      // }
      // else
      // {
      //     // Bill Atkinson's dithering algorithm
      //     newPixel = out.pixels[i] < 129 ? 0 : 255;
      //     err = Math.floor((out.pixels[i] - newPixel) / 8);
      //     out.pixels[i] = newPixel;

      //     out.pixels[i + 4] += err;
      //     out.pixels[i + 8] += err;
      //     out.pixels[i + 4 * w - 4] += err;
      //     out.pixels[i + 4 * w] += err;
      //     out.pixels[i + 4 * w + 4] += err;
      //     out.pixels[i + 8 * w] += err;
      // }

      // Set g and b pixels equal to r
      out.pixels[i + 1] = out.pixels[i + 2] = out.pixels[i];
      // Set whites to transparent
      out.pixels[i + 3] = out.pixels[i] > threshold ? 0 : 255;
    }
    out.updatePixels();
    return out;
  }

  // --- SHAPE DRAWING ---

  function drawRibbon(x, y, numSteps) {
    //let stepVal = step_length * scale;
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
    resizeOnly = true;
    newToken(false, true, false); // reloadToken
    // pf.resizeCanvas(canvasW, canvasH);
    // after this draw() will kick in again to redraw at the new size
  };

  pf.keyReleased = () => {
    if (pf.key === "s" || pf.key === "S") {
      pf.save(canvas, "giga_garden_" + tokenId + "_" + saveNum++ + ".png");
    }
    /* else if (pf.key === 'n' || pf.key === 'N') 
      {
        // generate a new token
        //keepColors = false;
        newToken(true, false);
        pf.redraw();
      }
      else if (pf.key === 'm' || pf.key === 'M') 
      {
        // generate a new token
        // newToken(false, false);
        // pf.redraw();
      }
      else if (pf.key === 'b' || pf.key === 'B') 
      {
        // try the next blend type
        //keepColors = false;
        newToken(false, false, true);
        pf.redraw();
      }
      else if (pf.key === 'x' || pf.key === 'X') 
      {
        // try the next blend type
        useOrigSize = !useOrigSize;
        newToken(false, false);
        pf.redraw();
      }
      else if (pf.key === 'l' || pf.key === 'L') 
      {
        // try the next blend type
        showLines = !showLines;
        newToken(false, false);
        pf.redraw();
      }*/
    //   else if (pf.key === 't' || pf.key === 'T')
    //   {
    //       // TESTING: force to same size as AB thumbnail
    //       showLarge = !showLarge;
    //       resizeOnly = true;
    //       newToken(false, true, false, (showLarge ? 1200 : 0));
    //   }
    else if (pf.key === "p" || pf.key === "P") {
      showLarge = !showLarge;
      resizeOnly = true;
      newToken(false, true, false, showLarge ? 3600 : 0);
    }
    //   else if (pf.key === 'f' || pf.key === 'f')
    //   {
    //       console.log("colors:", shapeCols);
    //       console.log("spots:", spots);
    //   }
  };

  // DEBUGGING
  // function printColors(showHsl = false)
  // {
  //     //console.log(getKeyByValue(colorSchemes, colorScheme) + " [" + colorlist.length + "]");
  //     let colStr = "[";

  //     if (showHsl)
  //     {
  //         let hex, hsl;
  //         for (var i = 0; i < colorlist.length; i++)
  //         {
  //             hex = colorList[i].toString('#rrggbb');
  //             hsl = hsluv.hexToHsluv(hex);
  //             colStr += JSON.stringify(hsl) + ",";
  //         }
  //     }
  //     else
  //     {
  //         for (var i = 0; i < colorList.length; i++)
  //         {
  //             colStr += "'" + colorList[i].toString('#rrggbb') + "',";
  //         }
  //     }

  //     console.log(colStr + "], //");
  // }

  // function exportRgb()
  // {
  //     //console.log(getKeyByValue(colorSchemes, colorScheme) + " [" + colorlist.length + "]");
  //     let colStrings = [];

  //     for (var i = 0; i < colorlist.length; i++)
  //     {
  //         colStrings.push(pf.color(colorlist[i]).toString('#rrggbb'));
  //     }

  //     console.log(colStrings);
  // }
}
let myp5 = new p5(skt, "sktch");
