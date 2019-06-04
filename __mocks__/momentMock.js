const now = new Date('2018-11-02')
Date.now = jest.fn().mockReturnValue(now)
