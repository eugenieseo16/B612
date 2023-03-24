package com.god.b612.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class FireBaseService {

    @Value("${app.firebase-bucket}")
    private String firebaseBucket = "find-your-b612.appspot.com";

    @Value("${app.firebase-image-url}")
    private String imageUrl = "https://storage.googleapis.com/find-your-b612.appspot.com/%s";

    public String uploadFiles(MultipartFile file) throws IOException, FirebaseAuthException {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        InputStream content = new ByteArrayInputStream(file.getBytes());
        String name = generateFileName(file.getOriginalFilename());
        Blob blob = bucket.create(name.toString(), content, file.getContentType());
        String url = "https://firebasestorage.googleapis.com/v0/b/" + firebaseBucket + "/o/" + name + "?alt=media";
        return url;
    }

    public String generateFileName(String originalFileName) {
        return UUID.randomUUID().toString() + originalFileName;
    }

}