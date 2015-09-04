/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains tests 
   for the feedreader application */
 $(function() {
    describe('RSS Feeds', function() {
    	/* Checks if allFeeds is defined and not empty */
    	it('are defined', function() {
    		expect(allFeeds).toBeDefined();
    		expect(allFeeds instanceof Array).toBeTruthy();
    		expect(allFeeds.length).not.toBe(0);
    	});

    	/* Checks if each feed in allFeeds has a valid url */
    	it('have url', function() {
    		for(var i=0; i<allFeeds.length; i++) {
    			expect(allFeeds[i].url).toBeDefined();
    			expect(allFeeds[i].url).not.toBe("");
    			expect(allFeeds[i].url).toMatch(/^http(s?)\:\/\//);
    		}
    	});

    	/* Checks if each feed in allFeeds has a name */
    	it('have name', function() {
    		for(var i=0; i<allFeeds.length; i++) {
    			expect(allFeeds[i].name).toBeDefined();
    			expect(typeof allFeeds[i].name).toBe('string');
    			expect(allFeeds[i].name).not.toBe("");
    			
    		}
    	});
    });

	describe('The menu', function() {

		/* Checks if the menu is hidden by default */
		it('is hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		/* Checks if the menu changes visibility when clicked*/
		it('changes visibility on click', function() {
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
    	});

	/* Checks if loadFeed successfully creates a new entry element in the feed container */
	describe('Initial Entries', function() {
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		it('has a single .entry element within the .feed container', function() {
			expect($('.feed .entry').length).toBeGreaterThan(0);
		});
   	});

	/* Checks if feed contect changes when loadFeed() adds a new feed */
	describe('New Feed Selection', function() {
		var feed1, feed2;

		beforeEach(function(done) {
			$('.feed').empty();
			loadFeed(0, function() {
				feed1 = $('.feed').html();
				loadFeed(1, function() {
					feed2 = $('.feed').html();
					done();
				});
			});
		});

		it('changes feed content', function(done) {
			expect(feed1).not.toEqual(feed2);
		});
	});
});

