import { StDmsPage } from './app.po';

describe('st-dms App', () => {
  let page: StDmsPage;

  beforeEach(() => {
    page = new StDmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
