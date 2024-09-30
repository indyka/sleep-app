const constants = {
    DB: {
        DEFAULT_TIMEOUT: 5000
    },
    PARSER: {
        JSON_LIMIT: '50mb'
    },
    ENUM: {
        SLEEP_SESSION: {
            STATUS: {
                OPEN: 'OPEN',
                COMPLETED: 'COMPLETED'
            },
            CLOCK_IN: 'clock-in',
            CLOCK_OUT: 'clock-out'
        }
    },
    PAGINATION: {
        DEFAULT_LIMIT: 10,
        DEFAULT_OFFSET: 0
    }
};

export default constants;
