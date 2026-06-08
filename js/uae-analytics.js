/**
 * UAE BIM Analytics Tracking System
 * Tracks page views, user interactions, and activity for admin dashboard
 */

(function() {
    'use strict';

    const UAEAnalytics = {
        storageKey: 'uaebim_analytics',
        sessionKey: 'uaebim_session',
        maxStorageSize: 500, // Max entries to keep

        init: function() {
            this.initSession();
            this.trackPageView();
            this.trackClicks();
            this.trackScrollDepth();
            this.trackTimeOnPage();
            this.trackFormSubmissions();
        },

        // Generate unique visitor ID
        getVisitorId: function() {
            let visitorId = localStorage.getItem('uaebim_visitor_id');
            if (!visitorId) {
                visitorId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('uaebim_visitor_id', visitorId);
            }
            return visitorId;
        },

        // Initialize or continue session
        initSession: function() {
            let session = sessionStorage.getItem(this.sessionKey);
            if (!session) {
                session = {
                    id: 's_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                    startTime: Date.now(),
                    pageViews: 0,
                    interactions: 0
                };
                sessionStorage.setItem(this.sessionKey, JSON.stringify(session));
            }
            return JSON.parse(sessionStorage.getItem(this.sessionKey));
        },

        // Get current session
        getSession: function() {
            return JSON.parse(sessionStorage.getItem(this.sessionKey) || '{}');
        },

        // Update session
        updateSession: function(updates) {
            const session = this.getSession();
            Object.assign(session, updates);
            sessionStorage.setItem(this.sessionKey, JSON.stringify(session));
        },

        // Get device info
        getDeviceInfo: function() {
            const ua = navigator.userAgent;
            let device = 'Desktop';
            if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
                device = /iPad|Tablet/i.test(ua) ? 'Tablet' : 'Mobile';
            }

            let browser = 'Other';
            if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) browser = 'Chrome';
            else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) browser = 'Safari';
            else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
            else if (ua.indexOf('Edg') > -1) browser = 'Edge';

            return { device, browser };
        },

        // Save analytics data
        saveData: function(type, data) {
            try {
                let analytics = JSON.parse(localStorage.getItem(this.storageKey) || '{"events":[]}');

                const event = {
                    type: type,
                    timestamp: Date.now(),
                    date: new Date().toISOString().split('T')[0],
                    visitorId: this.getVisitorId(),
                    sessionId: this.getSession().id,
                    page: window.location.pathname,
                    pageTitle: document.title,
                    referrer: document.referrer || 'direct',
                    ...this.getDeviceInfo(),
                    ...data
                };

                analytics.events.push(event);

                // Trim old events if exceeding max size
                if (analytics.events.length > this.maxStorageSize) {
                    analytics.events = analytics.events.slice(-this.maxStorageSize);
                }

                // Update summary stats
                analytics.summary = this.calculateSummary(analytics.events);
                analytics.lastUpdated = Date.now();

                localStorage.setItem(this.storageKey, JSON.stringify(analytics));
            } catch (e) {
                console.warn('Analytics storage error:', e);
            }
        },

        // Calculate summary statistics
        calculateSummary: function(events) {
            const now = Date.now();
            const today = new Date().toISOString().split('T')[0];
            const last7Days = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const last30Days = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const pageViews = events.filter(e => e.type === 'pageview');
            const todayViews = pageViews.filter(e => e.date === today);
            const last7DaysViews = pageViews.filter(e => e.date >= last7Days);
            const last30DaysViews = pageViews.filter(e => e.date >= last30Days);

            // Unique visitors
            const uniqueVisitors = [...new Set(pageViews.map(e => e.visitorId))].length;
            const todayVisitors = [...new Set(todayViews.map(e => e.visitorId))].length;

            // Page popularity
            const pageCounts = {};
            pageViews.forEach(e => {
                pageCounts[e.page] = (pageCounts[e.page] || 0) + 1;
            });

            // Device breakdown
            const deviceCounts = { Desktop: 0, Mobile: 0, Tablet: 0 };
            pageViews.forEach(e => {
                if (deviceCounts[e.device] !== undefined) {
                    deviceCounts[e.device]++;
                }
            });

            // Browser breakdown
            const browserCounts = {};
            pageViews.forEach(e => {
                browserCounts[e.browser] = (browserCounts[e.browser] || 0) + 1;
            });

            // Daily page views for last 7 days
            const dailyViews = {};
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                dailyViews[date] = pageViews.filter(e => e.date === date).length;
            }

            // Click tracking summary
            const clicks = events.filter(e => e.type === 'click');
            const buttonClicks = clicks.filter(e => e.elementType === 'button' || e.elementType === 'a');

            // Average time on page
            const timeEvents = events.filter(e => e.type === 'timeOnPage');
            const avgTime = timeEvents.length > 0
                ? Math.round(timeEvents.reduce((sum, e) => sum + (e.duration || 0), 0) / timeEvents.length)
                : 0;

            return {
                totalPageViews: pageViews.length,
                todayPageViews: todayViews.length,
                last7DaysPageViews: last7DaysViews.length,
                last30DaysPageViews: last30DaysViews.length,
                uniqueVisitors: uniqueVisitors,
                todayVisitors: todayVisitors,
                topPages: Object.entries(pageCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10),
                deviceBreakdown: deviceCounts,
                browserBreakdown: browserCounts,
                dailyViews: dailyViews,
                totalClicks: clicks.length,
                buttonClicks: buttonClicks.length,
                avgTimeOnPage: avgTime
            };
        },

        // Track page view
        trackPageView: function() {
            const session = this.getSession();
            this.updateSession({ pageViews: (session.pageViews || 0) + 1 });

            this.saveData('pageview', {
                url: window.location.href,
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight
            });
        },

        // Track clicks on important elements
        trackClicks: function() {
            document.addEventListener('click', (e) => {
                const target = e.target.closest('a, button, .btn, [data-track]');
                if (!target) return;

                const elementType = target.tagName.toLowerCase();
                const text = target.textContent.trim().substring(0, 50);
                const href = target.href || '';
                const classList = Array.from(target.classList).join(' ');

                this.saveData('click', {
                    elementType,
                    text,
                    href,
                    classList,
                    x: e.clientX,
                    y: e.clientY
                });

                const session = this.getSession();
                this.updateSession({ interactions: (session.interactions || 0) + 1 });
            });
        },

        // Track scroll depth
        trackScrollDepth: function() {
            let maxScroll = 0;
            let scrollMilestones = { 25: false, 50: false, 75: false, 100: false };

            const trackScroll = () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

                if (scrollPercent > maxScroll) {
                    maxScroll = scrollPercent;

                    [25, 50, 75, 100].forEach(milestone => {
                        if (scrollPercent >= milestone && !scrollMilestones[milestone]) {
                            scrollMilestones[milestone] = true;
                            this.saveData('scroll', {
                                milestone: milestone,
                                maxScroll: maxScroll
                            });
                        }
                    });
                }
            };

            let scrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(trackScroll, 100);
            });
        },

        // Track time on page
        trackTimeOnPage: function() {
            const startTime = Date.now();

            const recordTime = () => {
                const duration = Math.round((Date.now() - startTime) / 1000);
                if (duration > 5) { // Only track if more than 5 seconds
                    this.saveData('timeOnPage', {
                        duration: duration
                    });
                }
            };

            window.addEventListener('beforeunload', recordTime);
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') {
                    recordTime();
                }
            });
        },

        // Track form submissions
        trackFormSubmissions: function() {
            document.addEventListener('submit', (e) => {
                const form = e.target;
                const formId = form.id || form.name || 'unknown';
                const formAction = form.action || '';

                this.saveData('formSubmit', {
                    formId,
                    formAction,
                    formMethod: form.method
                });
            });
        },

        // Get analytics data (for admin dashboard)
        getData: function() {
            try {
                return JSON.parse(localStorage.getItem(this.storageKey) || '{"events":[],"summary":{}}');
            } catch (e) {
                return { events: [], summary: {} };
            }
        },

        // Clear all analytics data
        clearData: function() {
            localStorage.removeItem(this.storageKey);
            console.log('Analytics data cleared');
        },

        // Export data as JSON
        exportData: function() {
            const data = this.getData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'uaebim-analytics-' + new Date().toISOString().split('T')[0] + '.json';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => UAEAnalytics.init());
    } else {
        UAEAnalytics.init();
    }

    // Expose to global scope for admin dashboard
    window.UAEAnalytics = UAEAnalytics;

})();
