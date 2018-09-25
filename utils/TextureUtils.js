var TextureUtils = {
    loadTexture: function(gl, url) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0,0, 255, 255]);

        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
          width, height, border, srcFormat, srcType,
          pixel  
        );

        const image = new Image();
        var scope = this;
        image.onload = function() {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                srcFormat, srcType, image
            );

            if (scope.isPowOf2(image.width) && scope.isPowOf2(image.height))
            {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        // if( (new URL(url)).origin !== window.location.origin)
        // {
        //     image.crossOrigin = "";
        // }
        image.src = url;
        return texture;
    },
    isPowOf2: function(value)
    {
        return (value & (value - 1) == 0);
    },
}