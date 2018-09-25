var ShaderUtils = 
{
    loadShader: function(gl, type, source)
    {
        const shader = gl.createShader(type);
    
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
    
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        {
            alert("Error when load shader: "+gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    },
    initShaderPrograme : function(gl, vsSource, fsSource)
    {
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    
        const shaderProgram = gl.createProgram();
    
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
    
        if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
        {
            alert('Unable to initialize the shader program: '+ gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        return shaderProgram;
    }
}
