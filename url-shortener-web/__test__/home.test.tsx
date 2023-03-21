import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { url } from 'inspector';
import { shortenUrl } from '../api/url-shortner';
import Home from '../pages/index';

jest.mock('../api/url-shortner')

describe('Home component', () => {
    beforeEach(() => {
        render(<Home />)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('renders the form', () => {
        expect(screen.getByTestId('inputLongUrl')).toBeInTheDocument()
        expect(screen.getByTestId('submitButton')).toBeInTheDocument()
    })

    it('should show shorten url added after submitting valid url', async () => {
        const form = screen.getByTestId('form')
        const input = screen.getByTestId('inputLongUrl')

        const mockResponse = {
            id: 1,
            originalUrl: 'https://example.com',
            shortUrlKey: 'abc123',
            createdAt: new Date(),
        }

        await shortenUrl.mockResolvedValue(mockResponse)
        fireEvent.change(input, { target: { value: mockResponse.originalUrl } })
        fireEvent.submit(form)

        await waitFor(async () => {
            expect(shortenUrl).toHaveBeenCalledTimes(1);
            const urlHistoryList = await screen.findByTestId('urlHistoryList')
            expect(urlHistoryList).toHaveTextContent(mockResponse.originalUrl)
            expect(urlHistoryList).toHaveTextContent(mockResponse.shortUrlKey)
        });
    })

    it('should not trigger form submisstion for empty value', async () => {
        const form = screen.getByTestId('form')
        const input = screen.getByTestId('inputLongUrl')

        const error = new Error('Failed to shorten URL')
        shortenUrl.mockRejectedValue(error)

        fireEvent.change(input, { target: { value: 'invalid url' } })
        fireEvent.submit(form)

        expect(shortenUrl).not.toHaveBeenCalled()
    })

    it('should show error message for incorrect url', async () => {
        const form = screen.getByTestId('form')
        const input = screen.getByTestId('inputLongUrl')

        const error = new Error('Failed to shorten URL')
        shortenUrl.mockRejectedValue(error)

        fireEvent.change(input, { target: { value: 'htt://www.google.lk' } })
        fireEvent.submit(form)

        expect(screen.getByTestId('errorAlert')).toBeVisible()
        expect(screen.getByTestId('errorAlert')).toHaveTextContent('Invalid URL provided. Please follow this format. http(s)://www.example.com')
        expect(shortenUrl).not.toHaveBeenCalled()
    })
})


