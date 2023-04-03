package com.god.b612.service;

import com.god.b612.dto.PersonalBoardRequestDto;
import com.god.b612.dto.PersonalBoardResponseDto;
import com.god.b612.entity.PersonalBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface PersonalBoardService {

    public PersonalBoard registPersonalBoard(PersonalBoardRequestDto.Create personalBoardRequestDto, int ownerId, int writerId);

    public PersonalBoardResponseDto personalBoardSelectById(int personalBoardId);

    public PersonalBoardResponseDto updatePersonalBoard(PersonalBoardRequestDto.Update personalBoardRequestDto);

    public void deletePersonalBoard(int personalBoardId);

    Page<PersonalBoardResponseDto> findAll(Pageable pageable);
}
