import unittest
import json
import responses
import fetch_service


class TestFetchService(unittest.TestCase):

    @responses.activate
    def test_fetch_json_from_url_response(self):
        sample_url = "http://example.com/"
        expected_content = {'foo': 'bar'}
        responses.add(responses.GET, sample_url, json=expected_content, status=200)
        actual_content = fetch_service.fetch_from_url(sample_url)

        assert len(responses.calls) == 1
        assert responses.calls[0].request.url == sample_url
        assert responses.calls[0].response.text == json.dumps(expected_content)
        assert actual_content == json.dumps(expected_content)

    @responses.activate
    def test_fetch_from_url_without_protocol(self):
        sample_url = "example.com/"
        expected_content = {'foo': 'bar'}
        responses.add(responses.GET, "http://" + sample_url, json=expected_content, status=200)
        actual_content = fetch_service.fetch_from_url(sample_url)

        assert len(responses.calls) == 1
        assert responses.calls[0].request.url == "http://" + sample_url
        assert responses.calls[0].response.text == json.dumps(expected_content)
        assert actual_content == json.dumps(expected_content)

    @responses.activate
    def test_fetch_jpeg_returns_url(self):
        sample_url = "http://example.com/"
        responses.add(responses.GET, sample_url, status=200, content_type='JPEG')
        actual_content = fetch_service.fetch_from_url(sample_url)

        assert len(responses.calls) == 1
        assert responses.calls[0].request.url == sample_url
        assert actual_content == sample_url

    @responses.activate
    def test_fetch_jpg_returns_url(self):
        sample_url = "http://example.com/"
        responses.add(responses.GET, sample_url, status=200, content_type='JPG')
        actual_content = fetch_service.fetch_from_url(sample_url)

        assert len(responses.calls) == 1
        assert responses.calls[0].request.url == sample_url
        assert actual_content == sample_url

    @responses.activate
    def test_fetch_png_returns_url(self):
        sample_url = "http://example.com/"
        responses.add(responses.GET, sample_url, status=200, content_type='PNG')
        actual_content = fetch_service.fetch_from_url(sample_url)

        assert len(responses.calls) == 1
        assert responses.calls[0].request.url == sample_url
        assert actual_content == sample_url

    @responses.activate
    def test_fetch_pdf_returns_url(self):
        sample_url = "http://example.com/"
        responses.add(responses.GET, sample_url, status=200, content_type='PDF')
        actual_content = fetch_service.fetch_from_url(sample_url)

        assert len(responses.calls) == 1
        assert responses.calls[0].request.url == sample_url
        assert actual_content == sample_url

    @responses.activate
    def test_fetch_svg_returns_svg_string(self):
        sample_url = "http://example.com/"
        expected_content = """
        <svg height="100" width="100">
          <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
        </svg> 
        """
        responses.add(responses.GET, sample_url, status=200, body=expected_content, content_type='image/svg+xml')
        actual_content = fetch_service.fetch_from_url(sample_url)

        assert len(responses.calls) == 1
        assert responses.calls[0].request.url == sample_url
        assert actual_content == expected_content


if __name__ == '__main__':
    unittest.main()
