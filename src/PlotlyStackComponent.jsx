import Plot from 'react-plotly.js';

const PlotlyStackComponent = ({ timeseries_data }) => {
    const timeseries_keys = Object.keys(timeseries_data);
    const timeseries_absolute = timeseries_keys.map(e => parseInt(e));
    const data_keys = Object.keys(timeseries_data[timeseries_keys[0]]);
    const min_ts_value = Math.min(...timeseries_absolute);
    const timeseries_relative = timeseries_absolute.map(e => e - min_ts_value);
    const all_relative_series = data_keys.map(
        k => {
            return {
                name: k,
                x: timeseries_absolute.map(d => new Date(d * 1000)),
                y: timeseries_keys.map(
                    (t, i) => timeseries_data[t][k] / timeseries_data[timeseries_keys[(i - 1) >= 0 ? (i - 1) : (0)]][k]
                )
            }
        }
    );

    // collecting maximal values
    const max_values = timeseries_keys.map(
        (t, i) => (all_relative_series.map(
            graph => graph['y'][i]
        )).reduce((previousOutput, currentValue) => {
            return previousOutput <= currentValue ? currentValue : previousOutput;
        })
    );

    return <Plot data={all_relative_series.slice(0, 500)} />;
};

export default PlotlyStackComponent;
