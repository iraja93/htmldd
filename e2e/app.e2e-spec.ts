import { AppBuilderNewPage } from './app.po';

describe('app-builder-new App', () => {
  let page: AppBuilderNewPage;

  beforeEach(() => {
    page = new AppBuilderNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
