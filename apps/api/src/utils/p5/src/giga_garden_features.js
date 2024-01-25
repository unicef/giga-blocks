/**
 * giga_garden - Features script
 */
/**
 * Example:
 * 
 {
    "gestalt": "not their sky vortex",
    "coverage": "maelstrom",
    "wind": "gust",
    "color apportionment": "intuition",
    "underpainting": "quixotic",
    "doorway": "portal",
    "portal motivation": "devil's advocate",
    "portal guidance": "an abyss",
    "compass": "southeast",
    "gestalt frequency": "singular",
    "palette field theory": "and all the riches of the earth"
 }
 * 
 */

function calculateFeatures(tokenData) {
  // image placeholders
  let imgList = [
    "crop_circles",
    "fairyland",
    "to_live",
    "boisterous",
    "algae",
    "tethered",
    "the_many",
    "valley_dreams",
    "wintertime",
    "sky_vortex",
    "tenuous",
  ];

  // image names
  let gestaltNames = [
    "crop circles",
    "a fairyland created out of the commonest fern-stuff",
    "to live is the rarest thing in the world",
    "a boisterous stream in a boulder-choked channel",
    "algae exploration",
    "here I could stay tethered forever",
    "the many have come now",
    "valley dreams",
    "wish I could understand them",
    "not their sky vortex",
    "a tenuous grip on arctic dreams",
  ];

  let coverageNames = ["maelstrom", "hibernal", "arboretum"];

  let compassNames = [
    "north",
    "northeast",
    "east",
    "southeast",
    "south",
    "southwest",
    "west",
    "northwest",
    "true north",
    "true south",
  ];

  // giga_garden_colors.js

  let colorlist = [
    "000000",
    "000080",
    "00008b",
    "0000ff",
    "0047ab",
    "008000",
    "008080",
    "0096ff",
    "009e60",
    "00a36c",
    "00ff7f",
    "00ffff",
    "012845",
    "014678",
    "016e7a",
    "023020",
    "032108",
    "0437f2",
    "061c66",
    "071954",
    "07353b",
    "0818a8",
    "088f8f",
    "097969",
    "0bda51",
    "0c2436",
    "0c3136",
    "0e4459",
    "0f52ba",
    "132a33",
    "13331f",
    "141313",
    "1434a4",
    "182654",
    "184a4f",
    "191970",
    "194520",
    "1a1616",
    "1a298f",
    "1b1212",
    "1f0438",
    "1f402c",
    "1f51ff",
    "211703",
    "222929",
    "228b22",
    "241f26",
    "242226",
    "262425",
    "28282b",
    "2aaa8a",
    "2d103b",
    "2e658c",
    "2e8b57",
    "300229",
    "300b2b",
    "301934",
    "311947",
    "316646",
    "323333",
    "32cd32",
    "33092d",
    "343434",
    "34838c",
    "353935",
    "355e3b",
    "36454f",
    "383333",
    "3b0833",
    "3f00ff",
    "40826d",
    "40b5ad",
    "40e0d0",
    "4169e1",
    "454b1b",
    "461947",
    "4682b4",
    "474042",
    "478778",
    "483248",
    "483c32",
    "484e52",
    "49494d",
    "4a0404",
    "4cbb17",
    "4d6150",
    "4f7942",
    "50c878",
    "51414f",
    "515782",
    "52401f",
    "524d4e",
    "5ba0b5",
    "5c4033",
    "5d3fd3",
    "5f8575",
    "5f9ea0",
    "6082b6",
    "630330",
    "636163",
    "6495ed",
    "673147",
    "6dafde",
    "6e260e",
    "6e5d3d",
    "6f4e37",
    "6f8faf",
    "702963",
    "708090",
    "71797e",
    "719978",
    "722f37",
    "7393b3",
    "770737",
    "7b1818",
    "7b3f00",
    "7c3030",
    "7cb0c4",
    "7cfc00",
    "7dd2d4",
    "7df9ff",
    "7f00ff",
    "7fffd4",
    "800080",
    "80461b",
    "804b6b",
    "808000",
    "808080",
    "811331",
    "814141",
    "818589",
    "834333",
    "848884",
    "87ceeb",
    "880808",
    "899499",
    "89cff0",
    "8a9a5b",
    "8b4000",
    "8b4513",
    "8b8000",
    "8e9dfa",
    "90ee90",
    "913831",
    "915f6d",
    "91c2e6",
    "93c572",
    "953553",
    "954535",
    "96535c",
    "966919",
    "967969",
    "96ded1",
    "986868",
    "988558",
    "98fb98",
    "9a2a2a",
    "9f2b68",
    "9fe2bf",
    "a0522d",
    "a3d5d6",
    "a52a2a",
    "a7c7e7",
    "a95c68",
    "a9a9a9",
    "aa336a",
    "aa4a44",
    "aa98a9",
    "add8e6",
    "afc9b4",
    "afe1af",
    "b2beb5",
    "b4c424",
    "b6d0e2",
    "b87333",
    "ba3f6a",
    "baf5f0",
    "bd4051",
    "bdb5d5",
    "bf40bf",
    "c04000",
    "c0c0c0",
    "c19a6b",
    "c1e1c1",
    "c21e56",
    "c21e56",
    "c2a7db",
    "c2b280",
    "c3b1e1",
    "c41e3a",
    "c462b7",
    "c4a484",
    "c4b454",
    "c799c1",
    "c9a9a6",
    "c9cc3f",
    "cbc3e3",
    "cc5500",
    "cc7722",
    "ccccff",
    "cf9fff",
    "d2042d",
    "d2b48c",
    "d3d3d3",
    "d70040",
    "d8bfd8",
    "d9a61a",
    "da70d6",
    "daa06d",
    "daa520",
    "dc143c",
    "dfff00",
    "e0115f",
    "e0b0ff",
    "e0bfb8",
    "e1c16e",
    "e1f589",
    "e2dfd2",
    "e30b5c",
    "e34234",
    "e35335",
    "e3735e",
    "e37383",
    "e3963e",
    "e49b0f",
    "e4d00a",
    "e5aa70",
    "e5e4e2",
    "e5fc7c",
    "e6e6fa",
    "e6ede9",
    "e6eded",
    "e97451",
    "e9dcc9",
    "ec5800",
    "ecffdc",
    "edeade",
    "ee4b2b",
    "eedc82",
    "eefab9",
    "f08000",
    "f0e68c",
    "f0ead6",
    "f0ffff",
    "f28c28",
    "f2d2bd",
    "f33a6a",
    "f3cfc6",
    "f3e5ab",
    "f4bb44",
    "f4c430",
    "f5deb3",
    "f5f5dc",
    "f6f2f7",
    "f7f2f3",
    "f7f2f7",
    "f88379",
    "f89880",
    "f8c8dc",
    "f8de7e",
    "f9f6ee",
    "fa5f55",
    "fa8072",
    "faa0a0",
    "fac898",
    "fad5a5",
    "fada5e",
    "faf9f6",
    "fafa33",
    "fbceb1",
    "fbec5d",
    "fcbdf4",
    "fcf55f",
    "fcf5e5",
    "fdda0d",
    "ff0000",
    "ff2400",
    "ff4433",
    "ff5f15",
    "ff5f1f",
    "ff69b4",
    "ff7518",
    "ff7f50",
    "ffaa33",
    "ffb6c1",
    "ffbf00",
    "ffc0cb",
    "ffd580",
    "ffdb58",
    "ffdead",
    "ffe5b4",
    "ffea00",
    "fff5ee",
    "fffaa0",
    "fffdd0",
    "ffff00",
    "ffff8f",
    "fffff0",
    "ffffff",
  ];

  let palettes = [
    [
      "191970",
      "014678",
      "ADD8E6",
      "7393B3",
      "87CEEB",
      "7DD2D4",
      "0096FF",
      "4682B4",
    ], // blue
    [
      "28282B",
      "222929",
      "708090",
      "71797E",
      "818589",
      "49494D",
      "524D4E",
      "636163",
      "C0C0C0",
    ], // graphite
    [
      "008000",
      "355E3B",
      "4F7942",
      "316646",
      "032108",
      "009E60",
      "00A36C",
      "50C878",
      "228B22",
    ], // green
    ["E3963E", "FFBF00", "FFAA33", "F08000", "EE4B2B", "FF5F15", "FF7518"], // orange
    [
      "C21E56",
      "DE3163",
      "F8C8DC",
      "FAA0A0",
      "FCBDF4",
      "FFC0CB",
      "F33A6A",
      "FF69B4",
    ], // pink
    [
      "51414F",
      "BDB5D5",
      "673147",
      "702963",
      "461947",
      "3B0833",
      "CF9FFF",
      "5D3FD3",
      "9F2B68",
    ], // purple
    [
      "966919",
      "483C32",
      "52401F",
      "6E260E",
      "834333",
      "7B3F00",
      "6E5D3D",
      "8B8000",
      "C4A484",
    ], // terra
    //["F8DE7E","FFDB58","FDDA0D","FBEC5D","FFFF00","FAFA33","FFFAA0"] // yellow
  ];
  let paletteNames = [
    "reservoir",
    "graphite",
    "canopy",
    "helios",
    "indulgence",
    "regicide",
    "terra",
    // "canaries"
  ];

  let colorfulNames = [
    "easter",
    "cyber",
    "cambrian",
    "nectar",
    "carnival",
    "crown",
    "gallivant",
    "august",
    "sunchoke",
    "petals",
    "violet",
    "humus",
    "chanterelle",
    "ember",
    "moss",
  ];

  let colorfulPalettes = [
    ["000080", "f4c430", "34838c", "c462b7", "818589", "ffea00"],
    ["7393b3", "222929", "012845", "ff69b4", "016e7a", "8e9dfa"], // ?
    ["5c4033", "fcf5e5", "7393b3", "40e0d0", "808000", "f8c8dc"], // bright earth
    ["9f2b68", "8e9dfa", "2aaa8a", "f88379", "f8de7e", "483c32"], // ?
    ["6495ed", "673147", "40e0d0", "f5deb3", "ff5f1f", "f7f2f7"], // pastels
    ["000080", "d2042d", "211703", "fac898", "770737", "cbc3e3"], // dark and purple
    ["fff5ee", "52401f", "0047ab", "4f7942", "8b4000", "353935"], // earth and sky
    ["023020", "c4b454", "5ba0b5", "bd4051", "afc9b4", "c19a6b"], // dull shades
    ["4d6150", "fbec5d", "80461b", "7b1818", "bdb5d5", "f8c8dc"], // august
    ["e35335", "e5aa70", "770737", "016e7a", "e0bfb8", "40826d"], // flowers
    ["8a9a5b", "1a298f", "702963", "009e60", "cf9fff", "182654"], // violet
    ["300b2b", "ffdead", "80461b", "0f52ba", "5d3fd3", "184a4f"], // packed earth
    ["4169e1", "e0115f", "194520", "ec5800", "483c32", "c9a9a6"], // hard orange
    ["ba3f6a", "28282b", "355e3b", "f4bb44", "e34234", "89cff0"], // fiery
    ["c2a7db", "ffe5b4", "28282b", "b87333", "008000", "8e9dfa"], // moss
  ];

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
      [700, 600, 140, 800],
      [800, 700, 120, 600],
      [900, 700, 100, 600],
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
      [100, 1300, 250, 150],
      [900, 1300, 250, 150],
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
      [907, 1080, 519, 358],
      [169, 362, 174, 329],
      [360, 1200, 437, 148],
    ],
    [
      // impending
      [368, 267, 221, 424],
      [504, 579, 507, 275],
      [184, 1017, 285, 391],
      [555, 894, 493, 592],
      [21, 982, 350, 260],
    ],
    [
      // towers
      [500, 300, 1200, 900],
      [500, 900, 1200, 900],
      [500, 400, 220, 200],
      [500, 600, 220, 200],
      [500, 800, 220, 200],
      [500, 1000, 220, 200],
    ],
  ];

  let arrangementNames = [
    "piazza",
    "escalate",
    "summit",
    "mesas",
    "cultivation",
    "sequoias",
    "traverse",
    "mariana",
    "sedimentary",
    "cascade",
    "nazaré",
    "troposphere",
    "impending",
    "watchtower",
    "fortuitous",
    "intuition",
    "headway",
  ];

  let underpaintingNames = ["quixotic", "pellucid"];

  let doorwayNames = ["portal", "seamless"];

  let portalScaleNames = ["slight", "modest", "judicious", "generous"];

  // GLOBALS
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

  let specFactor1 = 11;

  // --- METADATA ---

  function getFeatureStrings(_tokenData) {
    newToken(_tokenData);
    lineColor = null;
    noLineColor = null;
    addTopMod();

    let feats = readFeatures();
    let featureStrings = [];
    Object.keys(feats).map((item) => {
      featureStrings.push(item + ": " + feats[item]);
    });
    return featureStrings;
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  function readFeatures() {
    // new version: features is an object
    let _feats = {};

    // images
    _feats["gestalt"] = gestaltNames[imgIndex1];
    _feats["gestalt echo"] =
      diptychStyle == 1 ? gestaltNames[imgIndex2] : "none";
    _feats["coverage"] = coverageNames[blendIdx];
    _feats["wind"] = bleachNames[bleaching];
    _feats["color apportionment"] = arrangementNames[arrangeIdx];
    _feats["underpainting"] = mottleColors ? "quixotic" : "pellucid";

    // doorway
    _feats["doorway"] = overlayStyle == 0 ? "seamless" : "portal";
    _feats["portal motivation"] =
      overlayStyle == 0
        ? "none"
        : overlayMatch
        ? "twinning"
        : "devil's advocate";
    let guidanceStr = "none";
    if (overlayStyle > 0) {
      if (overlayBlend == "hard_light") {
        guidanceStr = "parallel timelines";
      }
      if (overlayBlend == "darken") {
        guidanceStr = "an abyss";
      } else if (overlayBlend == "overlay") {
        guidanceStr = "disparate realities";
      }
    }
    _feats["portal guidance"] = guidanceStr;
    let scaleStr = "none";
    if (overlayStyle > 0) {
      if (overlaySizePct <= 0.4) {
        scaleStr = portalScaleNames[0];
      } else if (overlaySizePct <= 0.5) {
        scaleStr = portalScaleNames[1];
      } else if (overlaySizePct <= 0.6) {
        scaleStr = portalScaleNames[2];
      } else {
        scaleStr = portalScaleNames[3];
      }
    }
    _feats["portal scale"] = scaleStr;

    // compass
    let compassStr = "";
    let compassIdx = 0;
    if (canonical) {
      if (Math.round(angleOffset) == 180) {
        compassStr = "true south";
      } else {
        compassStr = "true north";
      }
    } else if (diptychStyle > 0) {
      compassStr = "north";
    } else {
      compassIdx = Math.floor(((angleOffset + 23) % 360) / 45);
      compassStr = compassNames[compassIdx];
    }
    _feats["compass"] = compassStr;

    // composition
    let freqStr = "singular";
    if (doMirror) {
      freqStr = mirrorFirst ? "sunrise" : "sunset";
      freqStr += mirrorVert ? " confrontation" : " reflection";
    } else if (diptychStyle > 0) {
      if (diptychStyle == 1) {
        freqStr = diptychNames[diptychStyle];
      } else {
        freqStr = diptychNames[quadRows];
      }
    }
    _feats["gestalt frequency"] = freqStr;

    // color palette
    let paletteStr = "and all the riches of the earth";
    if (colorScheme == 1) {
      paletteStr = paletteNames[paletteIndex];
    }
    _feats["palette field theory"] = paletteStr;

    return _feats;
  }

  // --- P5 SKETCH ---
  // function skt( pf )
  // {
  let blendTypes = [
    [0, "hard_light"], // pf.HARD_LIGHT
    [1, "hard_light"],
    [1, "difference"],
    [1, "darken"],
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
  let bleachNames = ["eye", "breeze", "gust"];
  let overlayStyle = 0;
  let overlayNames = ["none", "inset"];
  let overlaySizePct = 0.6;
  let overlayLeftPct = 0.05;
  let overlayTopPct = 0.05;
  let overlayBlend;
  let overlayMatch = true;
  let diptychOverlayAngle = 0;
  let overlayAngleNames = ["twinning", "devil's advocate"];

  let diptychStyle = 0;
  let diptychNames = {
    0: "singular",
    1: "totems",
    2: "mitosis",
    4: "quartos",
    8: "quilt club",
    16: "the machine is learning",
  };
  let firstImageLeft = true;

  let colorScheme = 0;
  let colorSchemeNames = ["Random", "Monochrome", "Colorful"];
  let paletteIndex = 0;
  let mottleColors = false;
  let doMirror = false;
  let mirrorVert = false;
  let mirrorFirst = true;
  let prevInvert = 0;
  let arrangeIdx = 0;
  let arrangeFlipped = false;
  let quadRows = 0;
  let spec = false;

  // replace with strings in the features script
  const HARD_LIGHT = "hard_light";
  const OVERLAY = "overlay";
  const DARKEST = "darken";
  /**
   * Extracts parameters from the token hash and uses them to define the features of the sketch
   */
  function newToken(
    genNewHash = false,
    doResize = false,
    reloadImages = false,
    newHeight = 0
  ) {
    // if (genNewHash || tokenData.hash == "")
    // {
    //     tokenData = genTokenData(333);
    //     loadNewBitmap = true;
    //     numImagesNeeded = 1;
    //     numImagesLoaded = 0;
    //     useOrigSize = false;
    // }
    // else
    // {
    //     if (sharpenCurrentImg) loadNewBitmap = true;
    // }

    // reset vars
    imgIndex2 = -1;
    let mirrorStr = "";
    doMirror = false;
    colorScheme = 0;
    let colorStr = "Random";
    canonical = false;
    let invertChance = 0.2;
    diptychStyle = 0;
    spec = false;

    // parse token data
    tokenId = parseInt(tokenData.tokenId) % 1000000;

    console.log("tokenData", tokenData);

    // seed the RNG and the noise function from the hash so they are determinative
    seedRandom(tokenData.hash);
    let noiseSeed = randInt(1000000);

    // pull out some randoms
    // this R() function is somehow off -- #1, 3 and 6 always match
    // pulling out the first batch so we don't get weird correspondences anymore
    //let rs = [];
    for (var i = 0; i < 11; i++) {
      R();
      //rs.push(R());
    }
    //console.log(rs);

    if (
      !canonical &&
      tokenId % specFactor1 == 0 &&
      tokenId < specFactor1 * 44
    ) {
      // canonical patterns are more on rails
      imgIndex1 = Math.floor(tokenId / specFactor1);
      if (imgIndex1 > 32) {
        // set 4
        // singular, upside down
        imgIndex1 -= 33;
        angleOffset = 180;
      }
      if (imgIndex1 > 21) {
        // set 3
        imgIndex1 -= 22;
        doMirror = true;
        mirrorVert = false;
        mirrorFirst = false;
        angleOffset = 180;
      } else if (imgIndex1 > 10) {
        // set 2
        imgIndex1 -= 11;
        useOrigSize = true;
      } else {
        // set 1
        doMirror = true;
        mirrorVert = false;
        mirrorFirst = true;
        useOrigSize = true;
      }

      overlayStyle = 0;
      canonical = true;
      colorScheme = 2;

      //console.log("XXXXXXXXXXXXXXXXXX");
    } else {
      imgIndex1 = randInt(imgList.length);
      angleOffset = randInt(360);
      invertChance = imgIndex1 == 3 ? 0.2 : 0.33;

      let randDip = R();
      if (randDip < 0.16) {
        diptychStyle = 1;
        // choose second image
        numImagesNeeded++;
        imgIndex2 = imgIndex1;
        do {
          imgIndex2 = randInt(imgList.length);
        } while (imgIndex2 == imgIndex1);
        //console.log("imgIndex2=", imgIndex2);

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

      let randScheme = R();
      if (randScheme < 0.04) {
        colorScheme = 1;
        paletteIndex = randInt(palettes.length);
        colorStr =
          "Monochrome: " + paletteIndex + ", " + paletteNames[paletteIndex];
      } else if (randScheme < 0.1) {
        colorScheme = 2;
      }
    } // end canonical/non-canonical logic

    if (colorScheme == 2) {
      paletteIndex = randInt(colorfulPalettes.length);
      colorStr =
        "Colorful: " + paletteIndex + ", " + colorfulNames[paletteIndex];
    }

    nextImageData = imgList[imgIndex1];

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

    let quadArray = [2, 3, 5, 8, 9];
    let darkArray = [3, 7, 10];

    let randDark = 5 - randInt(10);
    imgDarkness = 144; // default for hard_light
    if (diptychStyle == 2) {
      imgDarkness = 122; // 125
      if (quadArray.indexOf(imgIndex1) >= 0) {
        imgDarkness -= 8;
      } else if (darkArray.indexOf(imgIndex1) >= 0) {
        imgDarkness += 6;
      }
    } else {
      imgDarkness = blendIdx == 2 ? 125 : blendIdx == 1 ? 116 : 138;
      if (blendIdx != 1 && darkArray.indexOf(imgIndex1) >= 0) {
        imgDarkness += 12;
      }
    }
    imgDarkness += randDark;

    console.log("image=", imgIndex1, gestaltNames[imgIndex1], imgDarkness);
    console.log(
      "diptych=",
      diptychStyle == 1,
      diptychStyle == 1 ? imgIndex2 + ", " + gestaltNames[imgIndex2] : ""
    );
    console.log("quad=", diptychStyle == 2, quadRows);
    console.log("angled=", !useOrigSize, angleOffset);
    console.log("mirrorImage=", doMirror, mirrorStr);
    console.log("color scheme=", colorStr);
    console.log("filter=", blendNames[blendIdx]);
    console.log("inset blend=", overlayBlend);

    let r1 = R();
    bleaching = r1 < 0.08 ? 0 : r1 < 0.85 ? 1 : 2;
    console.log("ribboning=", bleachNames[bleaching]);

    chooseColors();
    arrangeColors();

    mottleColors = R() < 0.9 ? true : false;
    console.log("mottling=", mottleColors);

    if (newHeight == 0) {
      newHeight = 1200; //window.innerHeight;
    }

    setSize(newHeight, doResize);
  }

  function setSize(shh, doResize = false) {
    let sww = Math.round(shh * ratio);
    canvasW = sww;
    canvasH = shh;

    scale = canvasW / defaultW;

    //if (doResize) pf.resizeCanvas(canvasW, canvasH);
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
    //console.log("alpha:", shapeAlphaCols);
  }

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

  //console.log(tokenData);
  newToken(tokenData);

  return readFeatures();
}

//console.log(calculateFeatures(tokenData));
