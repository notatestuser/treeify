const { asTree, asLines } = require('../treeify')

// the `asTree` expectations are prefixed with a new line so that it's more readable in jest snapshots

describe('tree-test', () => {
  describe('A tree created from an empty object when returned as a whole tree', () => {
    const subject = {}
    describe('with values hidden', () => {
      it('is an empty string', () => {
        expect(asTree(subject, false)).toBe('')
      })
    })
    describe('with values shown', () => {
      it('is an empty string', () => {
        expect(asTree(subject, true)).toBe('')
      })
    })
  })

  describe('A tree created from an object with empty prototype when returned as a whole tree', () => {
    const subject = Object.create(null)
    subject.foo = 'bar'
    describe('with values hidden', () => {
      it('produces correct output', () => {
        expect('\n' + asTree(subject, false)).toMatchSnapshot()
      })
    })
    describe('with values shown', () => {
      it('produces correct output', () => {
        expect('\n' + asTree(subject, true)).toMatchSnapshot()
      })
    })
  })

  describe('A tree created from a single-level object', () => {
    const subject = {
      apples: 'gala',
      oranges: 'mandarin',
    }
    describe('when returned line-by-line', () => {
      describe('with values hidden', () => {
        it('runs the provided callback', () => {
          const callback = jest.fn()
          asLines(subject, false, callback)
          expect(callback.mock.calls).toMatchSnapshot('calls')
        })
      })
      describe('with values shown', () => {
        it('runs the provided callback', () => {
          const callback = jest.fn()
          asLines(subject, true, callback)
          expect(callback.mock.calls).toMatchSnapshot('calls')
        })
      })
    })
    describe('when returned as a whole tree', () => {
      describe('with values hidden', () => {
        it('produces correct output', () => {
          expect('\n' + asTree(subject, false)).toMatchSnapshot()
        })
      })
      describe('with values shown', () => {
        it('produces correct output', () => {
          expect('\n' + asTree(subject, true)).toMatchSnapshot()
        })
      })
    })
  })

  describe('A tree created from a multi-level object', () => {
    const subject = {
      oranges: {
        mandarin: {
          clementine: null,
          tangerine: 'so cheap and juicy!',
        },
      },
      apples: {
        gala: null,
        'pink lady': null,
      },
    }
    const customSerializer = (v, k) => (k === 'gala' ? null : `[${k} – ${v}]`)
    describe('when returned line-by-line', () => {
      describe('with values hidden', () => {
        it('runs the provided callback', () => {
          const callback = jest.fn()
          asLines(subject, false, callback)
          expect(callback.mock.calls).toMatchSnapshot('calls')
        })
      })
      describe('with values shown', () => {
        it('runs the provided callback', () => {
          const callback = jest.fn()
          asLines(subject, true, callback)
          expect(callback.mock.calls).toMatchSnapshot('calls')
        })
      })
      describe('with values shown using a custom serializer', () => {
        it('runs the provided callback', () => {
          const callback = jest.fn()
          asLines(subject, customSerializer, callback)
          expect(callback.mock.calls).toMatchSnapshot('calls')
        })
      })
    })
    describe('when returned as a whole tree', () => {
      describe('with values hidden', () => {
        it('produces correct output', () => {
          expect('\n' + asTree(subject)).toMatchSnapshot()
        })
      })
      describe('with values shown', () => {
        it('produces correct output', () => {
          expect('\n' + asTree(subject, true)).toMatchSnapshot()
        })
      })
      describe('with values shown using a custom serializer', () => {
        it('produces correct output', () => {
          expect('\n' + asTree(subject, customSerializer)).toMatchSnapshot()
        })
      })
    })
  })

  describe('A tree created from an object with not so circular references', () => {
    const subject = (() => {
      var obj = { one: 'one', two: { four: 'four' } }
      obj['three'] = obj.two
      return obj
    })()
    describe('when returned line-by-line', () => {
      describe('with values shown', () => {
        it('runs the provided callback', () => {
          const callback = jest.fn()
          asLines(subject, true, callback)
          expect(callback.mock.calls).toMatchSnapshot('calls')
        })
      })
    })
  })

  describe('A tree created from an object with circular references', () => {
    const subject = (() => {
      var obj = { one: 'one', two: 'two' }
      obj['three'] = obj
      return obj
    })()
    describe('when returned line-by-line', () => {
      describe('with values shown', () => {
        it('runs the provided callback', () => {
          const callback = jest.fn()
          asLines(subject, true, callback)
          expect(callback.mock.calls).toMatchSnapshot('calls')
        })
      })
    })
  })

  describe('A tree created from an object containing various types', () => {
    const subject = {
      array: ['one', 'two'],
      numeric: 42,
      decimal: 42.24,
      bool: false,
      nil: null,
      undef: undefined,
      date: new Date(2018, 0, 1),
    }
    describe('when returned line-by-line', () => {
      describe('with values shown', () => {
        it('runs the provided callback', () => {
          const callback = jest.fn()
          asLines(subject, true, callback)
          expect(callback.mock.calls).toMatchSnapshot('calls')
        })
      })
    })
  })

  describe('A tree created from an object with prototyped functions', () => {
    const subject = (() => {
      var func = function() {
        this.Friendly = 'stuff'
      }
      func.prototype.Nasty = function() {}
      return new func()
    })()
    describe('when returned as a whole tree', () => {
      describe('with values shown', () => {
        it('produces correct output', () => {
          expect('\n' + asTree(subject, true)).toMatchSnapshot()
        })
      })
    })
  })

  describe('A tree with functions', () => {
    const subject = {
      func: function() {},
      Friendly: 'stuff',
      Another: 'stuff',
    }
    describe('when returned line-by-line with values shown, but functions hidden', () => {
      it('runs the provided callback', () => {
        const callback = jest.fn()
        asLines(subject, false, true, callback)
        expect(callback.mock.calls).toMatchSnapshot('calls')
      })
    })
    describe('when returned as a whole tree with values shown, but functions hidden', () => {
      it('produces correct output', () => {
        expect('\n' + asTree(subject, true, true)).toMatchSnapshot()
      })
    })
  })
})
