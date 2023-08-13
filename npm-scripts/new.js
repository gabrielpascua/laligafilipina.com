const fs = require('fs/promises');
const path = require('path');
const cheerio = require('cheerio');

(async function(){
    const ISSUES_PATH = path.join(process.cwd(), 'site/data/issues');
    const issues = await fs.readdir(ISSUES_PATH);
    const lastIssueJson = issues.reverse().find((jsonFile) => {
        return (
            jsonFile.startsWith((new Date()).getFullYear().toString().substring(2)) &&
            jsonFile.endsWith('.json')
        );
    });
    const LAST_ISSUE_FILE = path.join(ISSUES_PATH, lastIssueJson);

    const lastIssue = JSON.parse(await fs.readFile(LAST_ISSUE_FILE));
    
    let { issue, hero, ticker, carousel } = lastIssue;

    // New Issue
    issue.number += 1;
    issue.date = new Date((new Date(issue.date)).getTime() + (7 * 24 * 60 * 60 * 1000))

    // Empty Hero
    const $ = cheerio.load(hero.content);
    $('a').attr('href', '#');
    $('.hero-lead').text('TBD');
    $('.hero-dek').text('TBD');
    $('p > small').text('tbd.com')
    hero.content = $('body').html();

    // Empty Tickers
    let { primary, secondary } = ticker;
    Object.keys(primary).forEach(k => primary[k] = '');
    secondary.forEach(sec => {
        Object.keys(sec).forEach(s => sec[s] = '');
    });

    // Empty Carousel
    carousel.forEach(car => {
        Object.keys(car).forEach(c => car[c] = '');
    });

    const newIssuePath = path.join(ISSUES_PATH, `${issue.number}.json`);
    await fs.writeFile(newIssuePath, JSON.stringify(
        {
            issue,
            hero,
            ticker,
            carousel
        },
        null,
        '    '
    ));
})();