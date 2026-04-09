import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { data } from "@/data";
import { TrackType } from "@/sharedTypes/types";
import ReduxProvider from "@/store/ReduxProvider";
import TrackItem from "./TrackItem";
import { formatTime } from "@/utils/helper";
import styles from "./trackitem.module.css";
import * as storeHooks from "@/store/store";

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

describe("Track component", () => {
  test("Отрисовка данных трека", () => {
    render(
      <ReduxProvider>
        <TrackItem track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>
    );
    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.album).length).toBeGreaterThan(0);
    expect(screen.getAllByText(formatTime(mockTrack.duration_in_seconds)).length).toBeGreaterThan(0);

  })
  test("добавляет класс playing для текущего трека", () => {
    jest.spyOn(storeHooks, "useAppSelector").mockReturnValue({
      currentTrack: mockTrack,
      isPlay: true,
      favoriteTracks: [],
    })
    render(
      <ReduxProvider>
        <TrackItem track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>
    )
    const indicator = document.querySelector(`.${styles.track__titleSvg}`);

    expect(indicator).toHaveClass(styles.track__titleSvg);
    expect(indicator).toHaveClass(styles.active);
    expect(indicator).toHaveClass(styles.playing);
  });
});



