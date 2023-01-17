// import { Responsive } from 'react-grid-layout';
import { adjustCardHeight } from './adjustCardHeight';

export const generateLayouts = (cards) => {
    console.log('generateLayouts called')
    // const gridWrapperWidth = document.getElementById('gridWrapper').offsetWidth
    // const currentBreakpoint = Responsive.utils.getBreakpointFromWidth({ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }, gridWrapperWidth)
    // const currentCols = Responsive.utils.getColsFromBreakpoint(currentBreakpoint, { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 })
    
    const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }

    let genLayouts = {lg: [], md: [], sm: [], xs: [], xxs: []}
    cards.forEach( (card, i) => {
        const height = adjustCardHeight(card.length)
        for (const [key, value] of Object.entries(cols)) {
            try {
                genLayouts[key].push({
                    i: card[0].card_uuid,
                    x: (i*2) % (value || 12),
                    // y: Infinity,  // puts it at the bottom
                    y: Math.floor(i/(value/2)) * 5,
                    w: 2,
                    h: height,
                    minW: 2,
                    maxW: 2,
                    minH: 2,
                    maxH: 5,
                    isBounded: true,
                })
                
            } catch (error) {
                console.log('error, genLayouts[key]: ', genLayouts[key])
                continue
            }
            // console.log('genLayouts[key] AFTER PUSH: ', genLayouts[key])
        }
    })
    

    return genLayouts
};
