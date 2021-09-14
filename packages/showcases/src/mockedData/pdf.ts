export const OPEN_API_SPEC = {
    "openapi": "3.0.2",
    "info": {"title": "FastAPI", "version": "0.1.0"},
    "paths": {
        "/status": {
            "get": {
                "summary": "Healthcheck",
                "operationId": "healthcheck_status_get",
                "responses": {
                    "200": {
                        "description": "Successful Response",
                        "content": {"application/json": {"schema": {}}}
                    }
                }
            }
        },
        "/annotation/{pdf_file_name}": {
            "get": {
                "summary": "Get Annotated Pdf",
                "operationId": "get_annotated_pdf_annotation__pdf_file_name__get",
                "parameters": [{
                    "required": true,
                    "schema": {"title": "Pdf File Name"},
                    "name": "pdf_file_name",
                    "in": "path"
                }],
                "responses": {
                    "200": {
                        "description": "Successful Response",
                        "content": {"application/json": {"schema": {}}}
                    },
                    "422": {
                        "description": "Validation Error",
                        "content": {"application/json": {"schema": {"$ref": "#/components/schemas/HTTPValidationError"}}}
                    }
                }
            }
        },
        "/search": {
            "post": {
                "summary": "Search",
                "operationId": "search_search_post",
                "requestBody": {
                    "content": {"application/json": {"schema": {"$ref": "#/components/schemas/SearchData"}}},
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "Successful Response",
                        "content": {"application/json": {"schema": {"$ref": "#/components/schemas/MatchData"}}}
                    },
                    "422": {
                        "description": "Validation Error",
                        "content": {"application/json": {"schema": {"$ref": "#/components/schemas/HTTPValidationError"}}}
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "HTTPValidationError": {
                "title": "HTTPValidationError",
                "type": "object",
                "properties": {
                    "detail": {
                        "title": "Detail",
                        "type": "array",
                        "items": {"$ref": "#/components/schemas/ValidationError"}
                    }
                }
            },
            "JinaData": {
                "title": "JinaData",
                "type": "object",
                "properties": {
                    "name": {"title": "Name", "type": "string", "default": "pdf_name"},
                    "id": {"title": "Id", "type": "string", "default": "doc_id"},
                    "score": {"title": "Score", "type": "number", "default": 1.0},
                    "page": {"title": "Page", "type": "string", "default": "1"},
                    "pdf": {"title": "Pdf", "type": "string", "default": "url_of_pdf"},
                    "pdf_name": {"title": "Pdf Name", "type": "string", "default": "pdf_name"},
                    "thumbnail": {"title": "Thumbnail", "type": "string", "default": "url_of_preview_image"},
                    "coordinates": {
                        "title": "Coordinates",
                        "type": "array",
                        "items": {"type": "number"},
                        "default": [1.0, 2.0]
                    },
                    "tags": {"title": "Tags", "type": "object"},
                    "annotated_pdf": {"title": "Annotated Pdf", "type": "string", "default": "annotated_pdf"}
                }
            },
            "MatchData": {
                "title": "MatchData",
                "type": "object",
                "properties": {
                    "data": {
                        "title": "Data",
                        "type": "array",
                        "items": {"$ref": "#/components/schemas/JinaData"},
                        "default": []
                    }
                }
            },
            "SearchData": {
                "title": "SearchData",
                "type": "object",
                "properties": {
                    "mime_type": {"title": "Mime Type", "type": "string", "default": "text"},
                    "data": {"title": "Data", "type": "string", "default": "search text"}
                }
            },
            "ValidationError": {
                "title": "ValidationError",
                "required": ["loc", "msg", "type"],
                "type": "object",
                "properties": {
                    "loc": {"title": "Location", "type": "array", "items": {"type": "string"}},
                    "msg": {"title": "Message", "type": "string"},
                    "type": {"title": "Error Type", "type": "string"}
                }
            }
        }
    }
}