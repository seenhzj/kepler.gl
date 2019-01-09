// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {
  LAYER_CONFIG_ID,
  DELETE_DATA_ID,
  ADD_DATA_ID,
  EXPORT_DATA_TYPE,
  RATIOS,
  RESOLUTIONS
} from 'constants/default-settings';

export const DEFAULT_ACTIVE_SIDE_PANEL = 'layer';
export const DEFAULT_MODAL = ADD_DATA_ID;

/**
 * A list of map control visibilities and activeness.
 * @constant
 * @type {Object}
 * @property {Object} visibleLayers - Default: `{show: true, active: false}`
 * @property {Object} mapLegend - Default: `{show: true, active: false}`
 * @property {Object} toggle3d - Default: `{show: true}`
 * @property {Object} splitMap - Default: `{show: true}`
 * @public
 */
export const DEFAULT_MAP_CONTROLS = {
  visibleLayers: {
    show: true,
    active: false
  },
  mapLegend: {
    show: true,
    active: false
  },
  toggle3d: {
    show: true
  },
  splitMap: {
    show: true
  }
};

/**
 * Default image export config
 * @constant
 * @type {Object}
 * @property {string} ratio - Default: 'SCREEN',
 * @property {string} resolution - Default: 'ONE_X',
 * @property {boolean} legend - Default: false,
 * @property {string} imageDataUri - Default: '',
 * @property {boolean} exporting - Default: false
 * @public
 */
export const DEFAULT_EXPORT_IMAGE = {
  // user options
  ratio: RATIOS.SCREEN,
  resolution: RESOLUTIONS.ONE_X,
  legend: false,
  // exporting state
  imageDataUri: '',
  exporting: false
};

/**
 * @constant
 * @type {Object}
 * @property {string} selectedDataset - Default: '',
 * @property {string} dataType - Default: 'csv',
 * @property {boolean} filtered - Default: true,
 * @property {boolean} config - deprecated
 * @property {boolean} data - used in modal config expor. Default: falset
 * @public
 */
export const DEFAULT_EXPORT_DATA = {
  selectedDataset: '',
  dataType: EXPORT_DATA_TYPE.CSV,
  filtered: true,
  config: false, // no longer used, since we removed the option to export config from modal data export
  data: false // this is used in modal config export
};

/**
 * Default initial `uiState`
 * @constant
 * @type {Object}
 * @property {boolean} readOnly - Default: false
 * @property {string} activeSidePanel - Default: 'layer'
 * @property {string|null} currentModal - Default: 'addData'
 * @property {string|null} datasetKeyToRemove - Default: null
 * @property {string|null} visibleDropdown - Default: null
 * @property {Object} exportImage - Default: `[DEFAULT_EXPORT_IMAGE](#DEFAULT_EXPORT_IMAGE)`
 * @property {Object} exportData - Default: `[DEFAULT_EXPORT_DATA](#DEFAULT_EXPORT_DATA)`
 * @property {Object} mapControls - Default: `[DEFAULT_MAP_CONTROLS](#DEFAULT_MAP_CONTROLS)`
 * @public
 */
export const INITIAL_UI_STATE = {
  readOnly: false,
  activeSidePanel: DEFAULT_ACTIVE_SIDE_PANEL,
  currentModal: DEFAULT_MODAL,
  datasetKeyToRemove: null,
  visibleDropdown: null,
  // export image modal ui
  exportImage: DEFAULT_EXPORT_IMAGE,
  // export data modal ui
  exportData: DEFAULT_EXPORT_DATA,
  // map control panels
  mapControls: DEFAULT_MAP_CONTROLS
};

/* Updaters */
export const toggleSidePanelUpdater = (state, {payload: id}) => {
  if (id === state.activeSidePanel) {
    return state;
  }

  if (id === LAYER_CONFIG_ID) {
    return {
      ...state,
      currentModal: id
    };
  }

  return {
    ...state,
    activeSidePanel: id
  };
};

export const toggleModalUpdater = (state, {payload: id}) => ({
  ...state,
  currentModal: id
});

export const showExportDropdownUpdater = (state, {payload: id}) => ({
  ...state,
  visibleDropdown: id
});

export const hideExportDropdownUpdater = (state, {payload}) => ({
  ...state,
  visibleDropdown: null
});

export const toggleMapControlUpdater = (state, {payload: panelId}) => ({
  ...state,
  mapControls: {
    ...state.mapControls,
    [panelId]: {
      ...state.mapControls[panelId],
      active: !state.mapControls[panelId].active
    }
  }
});

export const openDeleteModalUpdater = (
  state,
  {payload: datasetKeyToRemove}
) => ({
  ...state,
  currentModal: DELETE_DATA_ID,
  datasetKeyToRemove
});

export const toggleLegendUpdater = state => ({
  ...state,
  exportImage: {
    ...state.exportImage,
    legend: !state.exportImage.legend
  }
});

export const setRatioUpdater = (state, {payload}) => ({
  ...state,
  exportImage: {
    ...state.exportImage,
    ratio: payload.ratio
  }
});

export const setResolutionUpdater = (state, {payload}) => ({
  ...state,
  exportImage: {
    ...state.exportImage,
    resolution: payload.resolution
  }
});

export const startExportingImage = state => ({
  ...state,
  exportImage: {
    ...state.exportImage,
    exporting: true,
    imageDataUri: ''
  }
});

export const setExportImageDataUri = (state, {payload}) => ({
  ...state,
  exportImage: {
    ...state.exportImage,
    exporting: false,
    imageDataUri: payload.dataUri
  }
});

export const cleanupExportImage = state => ({
  ...state,
  exportImage: {
    ...state.exportImage,
    exporting: false,
    imageDataUri: ''
  }
});

export const setExportSelectedDatasetUpdater = (state, {payload}) => ({
  ...state,
  exportData: {
    ...state.exportData,
    selectedDataset: payload.dataset
  }
});

export const setExportDataTypeUpdater = (state, {payload}) => ({
  ...state,
  exportData: {
    ...state.exportData,
    dataType: payload.dataType
  }
});

export const setExportFilteredUpdater = (state, {payload}) => ({
  ...state,
  exportData: {
    ...state.exportData,
    filtered: payload.filtered
  }
});

export const setExportConfigUpdater = (state, action) => ({
  ...state,
  exportData: {
    ...state.exportData,
    config: !state.exportData.config
  }
});

export const setExportDataUpdater = (state, action) => ({
  ...state,
  exportData: {
    ...state.exportData,
    data: !state.exportData.data
  }
});
