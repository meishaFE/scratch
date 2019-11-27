import projectData from './project-data';

/* eslint-disable import/no-unresolved */
import popWav from '!arraybuffer-loader!./83a9787d4cb6f3b7632b4ddfebf74367.wav';
import backdrop from '!raw-loader!./cd21514d0531fdffb22204e0ec5ed84a.svg';
import costume1 from '!raw-loader!./f49719e8f2440f5d328f2604e97eb71d.svg';
import costume2 from '!raw-loader!./1af6b3af3bf2cda862bbe01034a336bb.svg';
import costume3 from '!raw-loader!./e83b30a4517bbe155e2b4a6367c8f70b.svg';
import costume4 from '!raw-loader!./8244f1fb159237179d1caaa69c070060.svg';
/* eslint-enable import/no-unresolved */

const defaultProject = translator => {
    let _TextEncoder;
    if (typeof TextEncoder === 'undefined') {
        _TextEncoder = require('text-encoding').TextEncoder;
    } else {
        /* global TextEncoder */
        _TextEncoder = TextEncoder;
    }
    const encoder = new _TextEncoder();

    const projectJson = projectData(translator);
    return [{
        id: 0,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(projectJson)
    }, {
        id: '83a9787d4cb6f3b7632b4ddfebf74367',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: new Uint8Array(popWav)
    }, {
        id: 'cd21514d0531fdffb22204e0ec5ed84a',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop)
    }, {
        id: 'f49719e8f2440f5d328f2604e97eb71d',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(costume1)
    }, {
        id: '1af6b3af3bf2cda862bbe01034a336bb',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(costume2)
    }, {
        id: 'e83b30a4517bbe155e2b4a6367c8f70b',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(costume3)
    }, {
        id: '8244f1fb159237179d1caaa69c070060',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(costume4)
    }];
};

export default defaultProject;
