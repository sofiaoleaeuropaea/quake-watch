import { normalizeEarthquakeData } from '../../src/hooks/useEarthquakes';
import type { USGSResponse, USGSFeature } from '../../src/types/earthquake';

const feature = (param: {
  id: string;
  place: string;
  magnitude: number;
  time: number;
  longitude: number;
  latitude: number;
  depth?: number;
}): USGSFeature => ({
  id: param.id,
  properties: { place: param.place, mag: param.magnitude, time: param.time },
  geometry: {
    coordinates: [param.longitude, param.latitude, param.depth ?? 0],
  },
});

const response = (features: USGSFeature[]): USGSResponse => ({
  type: 'FeatureCollection',
  metadata: {},
  features,
});

describe('normalizeEarthquakeData', () => {
  it('swaps [lon, lat] -> [lat, lon] and sorts by time desc', () => {
    const apiResponse = response([
      feature({
        id: 'ci1234567',
        place: 'Arizona',
        magnitude: 2.5,
        time: 1725220000000,
        longitude: 10,
        latitude: 20,
      }),
      feature({
        id: 'ci9876543',
        place: 'Alaska',
        magnitude: 3.1,
        time: 1725233600000,
        longitude: -120,
        latitude: 45,
      }),
    ]);

    const normalizedEarthquakes = normalizeEarthquakeData(apiResponse);

    expect(normalizedEarthquakes.map((e) => e.id)).toEqual(['ci9876543', 'ci1234567']);

    expect(normalizedEarthquakes[0].coordinates).toEqual([45, -120]);
    expect(normalizedEarthquakes[1].coordinates).toEqual([20, 10]);

    expect(normalizedEarthquakes[0]).toMatchObject({
      id: 'ci9876543',
      location: 'Alaska',
      magnitude: 3.1,
      time: 1725233600000,
    });
  });

  it('handles empty features array', () => {
    const normalizedEarthquakes = normalizeEarthquakeData(response([]));
    expect(normalizedEarthquakes).toEqual([]);
  });
});
