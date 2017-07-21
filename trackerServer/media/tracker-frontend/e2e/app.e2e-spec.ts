import { TrackerFrontendPage } from './app.po';

describe('tracker-frontend App', () => {
  let page: TrackerFrontendPage;

  beforeEach(() => {
    page = new TrackerFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
