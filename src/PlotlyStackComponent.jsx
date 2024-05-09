import Plot from 'react-plotly.js';

const PlotlyStackComponent = ({ timeseries_data }) => {
    const timeseries_keys = Object.keys(timeseries_data)
    const timeseries_absolute = Object.keys(timeseries_data).map(e => parseInt(e));
    const data_keys = Object.keys(timeseries_data[timeseries_keys[0]])
    const all_relative_series = data_keys.map(
        k => {
            return {
                name: k,
                x: timeseries_absolute,
                y: timeseries_keys.map(
                    t => timeseries_data[t][k]
                )
            }
        }
    )

    return <Plot data={all_relative_series.slice(1, 300)} />
};

export default PlotlyStackComponent;
